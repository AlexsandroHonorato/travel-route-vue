<template>
<div class="col-sm-12 container">
    <div id="travel-route-form">
        <div class="row g-6 align-items-center">
            <div class="col-auto text-left">
                <label for="lblOrigin" class="form-label">De onde você está saindo?</label>
                <input type="text" name="origin" class="form-control" id="origin" v-model="origin" maxlength="3" placeholder="Busque por aeroporto">
            </div>
            <div class="col-auto text-left">
                <label for="lblDestiny" class="form-label">Para onde você vai?</label>
                <input type="text" name="destiny" class="form-control" id="destiny" maxlength="3" v-model="destiny" placeholder="Busque por aeroporto">
            </div>
            <div class="col-auto">
                <button id="button-submit" @click="SearchTravelRoute" type="submit" class="btn btn-primary">Buscar Voos</button>
            </div>
        </div>
    </div>
    <div class="col-sm-12">
        <label class="form-label">Resultado da Busca.</label>
        <div class="col-sm-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th class="text-left" scope="col">#</th>
                        <th class="text-left" scope="col">Escala</th>
                        <th class="text-left " scope="col">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(travelRoute, idx) in ListTravelRoutes" :key="idx">
                        <td class="text-left">{{idx}}</td>
                        <td class="text-left">{{travelRoute.route }}</td>
                        <td class="text-left">{{travelRoute.finalPrice}}</td>
                    </tr>
                </tbody>         
            </table>
        </div>
    </div>
</div>
</template>

<script>
import {
    http
} from '../Services/APIServices';

export default {
    name: 'TravelRouteView',
    components: {

    },
    data() {
        return {
            origin: "",
            destiny: "",
            accessToken: "",
            ListTravelRoutes: [],
        }
    },
    methods: {

        async SearchTravelRoute() {

            var self = this;

            const data = {
                origin: self.origin,
                destiny: self.destiny
            };

            const dataJson = JSON.stringify(data);

            await http.get('v1/TravelRoute/SearchTravelRoutes?origin=' + data.origin + '&destiny=' + data.destiny + '')
                .then(resp => {
                    this.ListTravelRoutes = resp.data.listTravelRoutes;
                    console.log(this.ListTravelRoutes);
                }).catch(error => {
                    console.log(error);
                });
        },

        // async GetAcessToken() {
        //     var self = this;

        //     const data = {
        //         email: "admin@bancomaster.com.br",
        //         password: "123456"
        //     };

        //     await http.get('v1/ServiceAuthentication/AccessToken?email=' + data.email + '&password=' + data.password + '')
        //         .then(resp => {
        //             self.accessToken = resp.data.accessToken;
        //         }).catch(error => {
        //             console.log(error);
        //         });
        // }
    },
    // created() {
    //     this.GetAcessToken();
    // }

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
