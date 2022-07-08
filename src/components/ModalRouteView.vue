<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" ref="mymodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row g-6">
                    <div class="col-auto text-left">
                        <label for="lblOrigin" class="form-label">Digite a origem</label>
                        <input :disabled="disibleDelete" type="text" name="origin" class="form-control" id="origin" v-model="origin" maxlength="3" placeholder="Digite a origem">
                    </div>
                    <div class="col-auto text-left">
                        <label for="lblDestiny" class="form-label">Digite o destino</label>
                        <input :disabled="disibleDelete" type="text" name="destiny" class="form-control" id="destiny" maxlength="3" v-model="destiny" placeholder="Digite o destino">
                    </div>
                    <div class="col-auto text-left">
                        <label for="lblAmount" class="form-label">Digite o valor</label>
                        <input :disabled="disibleDelete" type="number" min="0.00" max="10000.00" name="amount" class="form-control" id="amount" v-model="amount" placeholder="Digite o valor da rota">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" v-if="visibleButtonSalve" id="button-salve" @click="CreateRoute()" class="btn btn-primary">Salvar Rota</button>
                <button type="button" v-if="visibleButtonEdit" id="button-salve" @click="EditRoute($event)" class="btn btn-primary">Salvar Rota</button>
                <button type="button" v-if="visibleButtonDelete" id="button-delete" @click="DeleteRoute($event)" class="btn btn-danger">Deletar Rota</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    http
} from '../Services/APIServices';

export default {
    name: 'ModalRouteView',
    data() {
        return {
            origin: "",
            destiny: "",
            accessToken: "",
            amount: 0,
            visibleButtonDelete: false,
            visibleButtonEdit: false,
            visibleButtonSalve: true,
            modalShow: true,
            disibleDelete: false,
        }

    },
    props: {
        idRoute: {
            type: Object,
            default: null,
        },
        modalTitle: {
            type: Object,
            default: null,
        },
    },
    methods: {

        ModalClose() {
            this.$refs["mymodal"].hide();
            // this.$refs.mymodal.hide();
            //this.$emit('close');
        },

        async CreateRoute() {

            var self = this;

            const data = {
                origin: self.origin,
                destiny: self.destiny,
                amount: self.amount,
            };

            const dataJson = JSON.stringify(data);

            await http.post('v1/Route/CreateRoute', dataJson, {
                    headers: {
                        'Authorization': `Bearer ${self.accessToken}`
                    }
                })
                .then(resp => {
                    alert("A rota " + resp.data.route.origin + " - " + resp.data.route.destiny + ", foi criada com sucesso");
                    self.origin = "";
                    self.destiny = "";
                    self.amount = 0;
                    this.$refs.mymodal.hide();
                    this.GetListRoute();
                }).catch(error => {
                    console.log(error);
                });
        },

        async EditRoute(e) {

            const buttonEdit = e.target.value;

            alert(buttonEdit);
        },

        async DeleteRoute(e) {

            const buttonDelete = e.target.value;

            alert(buttonDelete);
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
