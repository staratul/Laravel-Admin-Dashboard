@extends('layouts.master')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

{{--
Client ID: 1
Client secret: ZwpCETvarXJmlpkZtbN2xMKYhtCEk1O55PeRFKCj
Password grant client created successfully.
Client ID: 2
Client secret: W3ptlyUbK6e8SU316PtS9L31KZrj219AQEfGRdSJ --}}
