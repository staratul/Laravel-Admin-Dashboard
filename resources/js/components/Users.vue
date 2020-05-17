<template>
    <div class="container my-5">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users List</h3>
                <div class="card-tools">
                    <button class="btn btn-success rounded-0" @click="modalOpen">Add New <i class="fas fa-user-plus"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered At</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.type | upText }}</td>
                      <td>{{ user.created_at | myDate }}</td>
                      <td>
                          <a href="#" @click="editModal(user)">
                              <i class="fa fa-edit blue"></i>
                          </a>
                            /
                          <a href="#" @click="deleteUser(user.id)">
                              <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <div class="modal fade" id="userModal">
        <div class="modal-dialog">
         <form @submit.prevent="editMode ? updateUser() : createUser()">
              <div class="modal-content">
            <div class="modal-header bg-primary">
              <h4 class="modal-title" v-show="!editMode">Add New User</h4>
              <h4 class="modal-title" v-show="editMode">Update User's Info</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input v-model="form.name" type="text" name="name"
                        class="form-control" placeholder="Name" :class="{ 'is-invalid': form.errors.has('name') }">
                    <has-error :form="form" field="name"></has-error>
                </div>
                <div class="form-group">
                    <input v-model="form.email" type="email" name="email"
                        class="form-control" placeholder="E-Mail" :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                </div>
                <div class="form-group">
                    <textarea v-model="form.bio" name="bio"
                        class="form-control" placeholder="Sort Bio" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                    <has-error :form="form" field="bio"></has-error>
                </div>
                <div class="form-group">
                    <select v-model="form.type" name="type"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                      <option value="">Select User Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Standard User</option>
                      <option value="author">Author</option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                </div>
                <div class="form-group">
                    <input v-model="form.password" name="password" type="password"
                        class="form-control" placeholder="Password" :class="{ 'is-invalid': form.errors.has('password') }">
                    <has-error :form="form" field="password"></has-error>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-danger red" data-dismiss="modal">Close</button>
              <button v-show="editMode" type="submit" class="btn btn-success rounded-0">Update</button>
              <button v-show="!editMode" type="submit" class="btn btn-primary rounded-0">Create</button>
            </div>
          </div>
         </form>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                editMode: false,
                users: {},
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
        methods: {
            updateUser() {
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id).then(() => {
                    $("#userModal").modal("hide");
                    Fire.$emit('AfterCreate');
                    swal.fire(
                        'Updated!',
                        'Your file has been updated.',
                        'success'
                    )
                    this.$Progress.finish();
                }).catch(() => {
                    this.$Progress.fail()
                });
            },
            editModal(user) {
                this.editMode = true;
                this.form.reset();
                this.form.fill(user);
                $("#userModal").modal("show");
            },
            modalOpen() {
                this.editMode = false;
                this.form.reset();
                $("#userModal").modal("show");
            },
            getUsers() {
                axios.get("api/user").then(({data}) => (this.users = data.data));
            },
            createUser() {
                this.$Progress.start();
                this.form.post('api/user').then(() => {
                    Fire.$emit('AfterCreate');
                    $("#userModal").modal("hide");
                    toast.fire({
                        icon: 'success',
                        title: 'User created successfully'
                    })
                this.$Progress.finish();
                }).catch((err) => {
                    this.$Progress.fail()
                });
            },
            deleteUser(id) {
                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                    if (result.value) {
                        // Send request to the server
                        this.form.delete('api/user/'+id).then(() => {
                            Fire.$emit('AfterCreate');
                            swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }).catch((err) => {
                            swal("Failed!", "There was something wronge.", "warning");
                        });
                    }
                })
            }
        },
        mounted() {
            this.getUsers();
            Fire.$on('AfterCreate', () => this.getUsers())
            // setInterval(() => this.getUsers(), 3000);
        }
    }
</script>
