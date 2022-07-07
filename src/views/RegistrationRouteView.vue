<template>
<div class="col-sm-12 container">
    <div id="travel-route-form">
        <div class="row g-6">
            <div class="col-auto text-left">
                <label for="lblOrigin" class="form-label">Digite a origem</label>
                <input type="text" name="origin" class="form-control" id="origin" v-model="origin" maxlength="3" placeholder="Digite a origem">
            </div>
            <div class="col-auto text-left">
                <label for="lblDestiny" class="form-label">Digite o destino</label>
                <input type="text" name="destiny" class="form-control" id="destiny" maxlength="3" v-model="destiny" placeholder="Digite o destino">
            </div>
            <div class="col-auto text-left">
                <label for="lblAmount" class="form-label">Digite o valor</label>
                <input type="number"  min="0.00" max="10000.00" name="amount" class="form-control" id="amount" v-model="amount" placeholder="Digite o valor da rota">
            </div>
            <div class="col-auto">
                <button id="button-submit" @click="CreateRoute" type="submit" class="btn btn-primary">Cadastrar Rota</button>
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
                        <td class="float-right"><button cbutton type="button"   @click="EditRoute($event)" value="12345" class="btn btn-primary btn-sm ">Editar</button></td>
                        <td  class="float-right"><button button type="button" class="btn btn-danger btn-sm">Deletar</button></td>
                    </tr>
                </tbody>         
            </table>
        </div>
    </div>
</div>
</template>

<script>
import { http } from '../Services/APIServices';

export default {
    name: 'RegistrationRouteView',  
    data() {
        return {
            origin: "",
            destiny: "",
            accessToken: "",
            amount: 0,
            ListRoutes: [],
        }
   
    },
    methods: {

        async CreateRoute() {

            var self = this;

            const data = {
                origin: self.origin,
                destiny: self.destiny,
                amount: self.amount,
            };

            const dataJson = JSON.stringify(data);

            await http.post('v1/Route/CreateRoute', dataJson, { headers: { 'Authorization': `Bearer ${self.accessToken}` } })
                .then(resp => {
                    alert("A rota " + resp.data.route.origin + " - "+ resp.data.route.destiny + ", foi criada com sucesso");                 
                }).catch(error => {
                    console.log(error);
                });
        },

        async EditRoute(e){

          const buttonEdit= e.target.value;

          alert(buttonEdit);
        },

        async GetListRoute(){   
            var self = this;

            await http.get('v2/Route/ListRoute', { headers: { 'Authorization': `Bearer ${self.accessToken}` } })
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
   
    created(){
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

.text-left{
    text-align: left;
}
</style>
