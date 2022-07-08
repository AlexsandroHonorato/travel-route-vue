<template>
<div class="col-sm-12 container">
    <div id="travel-route-form">
        <div class="row g-6">
            <div class="col-auto text-left">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="CreateRoute()">
                    Cadastrar Rota
                </button>
            </div>
        </div>
    </div>
    <div class="col-sm-12">
        <label class="form-label">Resultado da Busca.</label>
        <div class="col-sm-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th class="text-left" scope="col">Origem</th>
                        <th class="text-left" scope="col">Destino</th>
                        <th class="text-left " scope="col">Valor</th>
                        <th class="text-rigth float-right" scope="col">Editar</th>
                        <th class="text-rigth float-right" scope="col">Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(route, idx) in ListRoutes" :key="idx">
                        <td class="text-left">{{route.origin}}</td>
                        <td class="text-left">{{route.destiny}}</td>
                        <td class="text-left">{{route.amount}}</td>
                        <td class="float-right"><button cbutton type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="EditRoute($event)" :value="route.id" class="btn btn-primary btn-sm ">Editar</button></td>
                        <td class="float-right"><button button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="DeleteRoute($event)" :value="route.id" class="btn btn-danger btn-sm">Deletar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <ModalRoute :id-route="idRoute" :modal-title="modalTitle" />

</div>
</template>

<script>
import {
    http
} from '../Services/APIServices';
import ModalRoute from '../components/ModalRouteView.vue';

export default {
    name: 'RegistrationRouteView',
    components: {
        ModalRoute
    },
    data() {
        return {
            origin: "",
            destiny: "",
            accessToken: "",
            amount: 0,
            ListRoutes: [],
            idRoute: "",
            modalTitle: "",
        }

    },

    methods: {

        async CreateRoute() {

            var self = this;
            self.modalTitle = "Cadastrar Rota";
        },

        async EditRoute(e) {
            var self = this;
            self.modalTitle = "Editar Rota";
            self.idRoute = e.target.value;

            const buttonEdit = e.target.value;

        },

        async DeleteRoute(e) {
            var self = this;
            self.modalTitle = "Deletar Rota";
            self.idRoute = e.target.value;

            const buttonDelete = e.target.value;

        },

        async GetListRoute() {
            var self = this;

            await http.get('v2/Route/ListRoute', {
                    headers: {
                        'Authorization': `Bearer ${self.accessToken}`
                    }
                })
                .then(resp => {
                    console.log(resp);
                    this.ListRoutes = resp.data.listRoute;

                }).catch(error => {
                    console.log(error);
                });

        },
        async GetAcessToken() {
            var self = this;

            const data = {
                email: "admin@bancomaster.com.br",
                password: "123456"
            };

            await http.get('v1/ServiceAuthentication/AccessToken?email=' + data.email + '&password=' + data.password + '')
                .then(resp => {
                    self.accessToken = resp.data.accessToken;
                    this.GetListRoute();
                }).catch(error => {
                    console.log(error);
                });
        }
    },

    created() {
        this.GetAcessToken();
    }
}
</script>

<style scoped>
#travel-route-form {
    max-width: 900px;
    margin: 50px auto;
}

#button-submit {
    margin-top: 30px;
}

.container {
    width: 100vw;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.text-left {
    text-align: left;
}
</style>
