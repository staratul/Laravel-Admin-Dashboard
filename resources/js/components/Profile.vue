<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 my-5">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background: lightpink;">
                        <h3 class="widget-user-username text-right">Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc text-right">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar" />
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">3,200</h5>
                                    <span class="description-text">SALES</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">13,000</h5>
                                    <span class="description-text">FOLLOWERS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                                <div class="description-block">
                                    <h5 class="description-header">35</h5>
                                    <span class="description-text">PRODUCTS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                            <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane" id="activity">
                                <h1 class="text-center">Display User Activity</h1>
                            </div>
                            <div class="tab-pane active" id="settings">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                        <div class="col-sm-10">
                                            <input v-model="form.name" type="text" name="name" class="form-control" id="inputName" placeholder="Name" :class="{ 'is-invalid': form.errors.has('name') }" />
                                            <has-error :form="form" field="name"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                        <div class="col-sm-10">
                                            <input v-model="form.email" type="email" name="email" class="form-control" id="inputEmail" placeholder="Email" :class="{ 'is-invalid': form.errors.has('email') }" />
                                            <has-error :form="form" field="email"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="bio" class="col-sm-2 col-form-label">Sort Bio</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" v-model="form.bio" name="bio" id="bio" placeholder="Sort Bio"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputSkills" class="col-sm-2 col-form-label">Profile Photo</label>
                                        <div class="col-sm-10">
                                            <input type="file" @change="uploadPhoto" name="profile" id="inputSkills" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="passport" class="col-sm-6 col-form-label">Password (leave empty if not changing)</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="form.password"  class="form-control" name="password" id="password" placeholder="Password" :class="{ 'is-invalid': form.errors.has('password') }" />
                                            <has-error :form="form" field="password"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-10">
                                            <button @click.prevent="updateProfile" type="submit" class="btn btn-success">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        mounted() {
            console.log("Component mounted.");
        },
        created() {
            axios.get('api/profile').then(({data}) => (this.form.fill(data)));
        },
        methods: {
            uploadPhoto(e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                if(file['size'] > 2111775) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You are uploading a large file!'
                    })
                } else {
                    reader.onloadend = (file) => {
                        this.form.photo = reader.result;
                    }
                    reader.readAsDataURL(file);
                }
            },
            updateProfile() {
                this.$Progress.start();
                this.form.put('api/profile').then(() => {
                    Fire.$emit('AfterCreated');
                    this.$Progress.finish();
                    swal.fire(
                        'Updated!',
                        'Your profile has been updated.',
                        'success'
                    )
                }).catch((err) => {
                    this.$Progress.fail();
                });
            },
            getProfilePhoto() {
                return (this.form.photo.length > 200) ? this.form.photo : "img/profile/"+this.form.photo
            }
        }
    };
</script>
