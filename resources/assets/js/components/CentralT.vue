<template>
  <div class="container-fluid">
    <section class="content-header">
         <h1>

           <small></small>
         </h1>
         <ol class="breadcrumb">
           <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
           <li class="active">Central Telefonica</li>
         </ol>
       </section>
<div class="tabled">
    <br>

    <h3 style="text-align: center;">Central</h3>

    <div style="padding: 5px">

      <a class="btn-t btn-primary pull-left" href="#" v-on:click.prevent
      ="showModal=true"> <i class="fa fa-user-plus" aria-hidden="true"></i>Nueva Central Telefonica</a>

    </div>

    <!-- For markup truncated -->

    <table class="table table-striped">
      <tr  class="row-name">
        <th>#</th>
        <th>Nombre</th>
        <th>Direccion</th>
        <th>Parroquia</th>
        <th>Sector</th>
        <th>Tanque</th>
        <th>Editar</th>


      </tr>
      <tr v-for="b in central"  class="row-content">
        <td>{{ b.id }}</td>
        <td>{{ b.name }}</td>
        <td>{{b.address}} </td>
        <td>{{ b.parroquia.name }}</td>
        <td>{{b.sector.name}}</td>
        <td>{{b.tanque.name}}</td>


        <td v-on:click.prevent="onEdit(b)"><a class="btn-top  btn btn-primary"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
      <!--  <td v-on:click.prevent="onDelete(b)"><a class="btn-top btn btn-danger  pull-right"> <i class="fa fa-trash" aria-hidden="true"></i></a></td>-->
      </tr>

    </table>

    <nav>
                <ul class="pagination">
                    <li v-if="pagination.current_page > 1">
                        <a  aria-label="Previous"
                           v-on:click.prevent="changePage(pagination.current_page - 1)">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li v-for="page in pagesNumber"
                        :class="[ page == isActived ? 'active' : '']">
                        <a  v-on:click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li v-if="pagination.current_page < pagination.last_page">
                        <a aria-label="Next" v-on:click.prevent="changePage(pagination.current_page + 1)">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
    <br>



      <modal :display="showModal" @close="showModal = false">
        <div slot="header">
          <i class="fa fa-user"></i> Registro de Central

        </div>
        <div slot="body">
          <form class="form">

            <div class="form-group inner-addon left-addon">
               <i class="fa fa-user" aria-hidden="true"></i>
              <input v-validate="'required'" v-model="newCentral.name" type="text" class="form-control" placeholder="Nombre" :class="{'input': true, 'is-danger': errors.has('name') }">
             <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>

            </div>
             <div class="form-group inner-addon left-addon">
                   <i class="fa fa-globe" aria-hidden="true"></i>
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('address') }" v-model="newCentral.address" type="text" class="form-control" placeholder="Direccion" name="address">
             <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>

            </div>
            <div  class="form-group inner-addon left-addon">
              <v-select :value="parroquia.id" v-model="newCentral.parish_id" placeholder="Seleccione Parroquia"  :options="SelectP" :on-change="onChangeP"><span slot="no-options">Por favor registre una parroquia en su modulo</span></v-select>
            </div>

            <div class="form-group inner-addon left-addon">
              <v-select :value="sector.id" v-model="newCentral.sector_id" placeholder="Seleccione el Sector"  :options="SelectS" :on-change="onChangeS"><span slot="no-options">Por favor registre un sector en su modulo</span></v-select>
            </div>

            <div class="form-group inner-addon left-addon">


             <v-select :value="tanque.id" v-model="newCentral.tanks_id" placeholder="Seleccione el tanque"  :options="SelectT" :on-change="onChangeT"><span slot="no-options">Por favor registre un tanque o tanquilla en su modulo</span></v-select>

            </div>
          </form>

        </div>
        <div slot="footer">

        <a href="#" class="btn btn-primary" v-on:click.prevent="saveCentral()">Guardar</a>

          <a href="#" class="btn btn-default" v-on:click.prevent="showModal=false">Cerrar</a>

        </div>
      </modal>



      <modal :display="showModal1" @close="showModal1 = false">
        <div slot="header">
          <i class="fa fa-user"></i> Registro de Central

        </div>
        <div slot="body">
          <form class="form">

            <div class="form-group inner-addon left-addon">
               <i class="fa fa-user" aria-hidden="true"></i>
              <input v-validate="'required'" v-model="editCentral.name" type="text" class="form-control" placeholder="Nombre" :class="{'input': true, 'is-danger': errors.has('name') }">
             <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>

            </div>
             <div class="form-group inner-addon left-addon">
                   <i class="fa fa-globe" aria-hidden="true"></i>
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('address') }" v-model="editCentral.address" type="text" class="form-control" placeholder="Direccion" name="address">
             <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>

            </div>
            <div  class="form-group inner-addon left-addon">
              <v-select :value="parroquia.id" v-model="editCentral.parish_id" placeholder="Seleccione Parroquia"  :options="SelectP" :on-change="onChangeP"><span slot="no-options">Por favor registre una parroquia en su modulo</span></v-select>
            </div>

            <div class="form-group inner-addon left-addon">
              <v-select :value="sector.id" v-model="editCentral.sector_id" placeholder="Seleccione el Sector"  :options="SelectS" :on-change="onChangeS"><span slot="no-options">Por favor registre un sector en su modulo</span></v-select>
            </div>

            <div class="form-group inner-addon left-addon">


             <v-select :value="tanque.id" v-model="editCentral.tanks_id" placeholder="Seleccione el tanque"  :options="SelectT" :on-change="onChangeT"><span slot="no-options">Por favor registre un tanque o tanquilla en su modulo</span></v-select>

            </div>
          </form>

        </div>
        <div slot="footer">

        <a href="#" class="btn btn-primary" v-on:click.prevent="updateCentral()">Guardar</a>

          <a href="#" class="btn btn-default" v-on:click.prevent="showModal1=false">Cerrar</a>

        </div>
      </modal>

  </div>
</div>

</template>

<script>

import Vue from 'vue';
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

var getCental = 'central';
var post_central = 'central_save';

export default {

  data(){
      return {
        central: [],
        showModal:false,
        showModal1:false,
        sector:{
          id:''
        },
        parroquia:{
          id:''
        },
        tanque:{
          id:''
        },
        tan:[],
        sec:[],
        parro:[],
        newCentral:{
          name:'',
          address:'',
          parish_id:'',
          sector_id:'',
          tanks_id:''
        },
        editCentral:{
          name:'',
          address:'',
          parish_id:'',
          sector_id:'',
          tanks_id:''
        },
        pagination:{
          total:0,
          per_page : 7,
          from:1,
          to:0,
          current_page:1
        },
        offset: 4,

      }
  },
  created(){
    this.fetchCentral(this.pagination.current_page);
    this.fetchSector();
    this.fetchParroquia();
    this.fetchTanque();

  },
  computed:{
    SelectT(){
      return this.tan.map(g =>(
        {
          label:g.name,
           value:g.id
         }
      ))
    },
    SelectP(){
      return this.parro.map(g =>(
        {
          label:g.name,
           value:g.id
         }
      ))
    },
    SelectS(){
      return this.sec.map(g =>(
        {
          label:g.name,
           value:g.id
         }
      ))
    },
    isActived(){
      return this.pagination.current_page;
    },
    pagesNumber(){
      if (!this.pagination.to) {
               return [];
           }
           var from = this.pagination.current_page - this.offset;
           if (from < 1) {
               from = 1;
           }
           var to = from + (this.offset * 2);
           if (to >= this.pagination.last_page) {
               to = this.pagination.last_page;
           }
           var pagesArray = [];
           while (from <= to) {
               pagesArray.push(from);
               from++;
           }
           return pagesArray;
    }
  },
  methods:{

    onChangeT(obj){
        this.tanque.id = obj.value;
    },

    onChangeP(obj){
        this.parroquia.id = obj.value;
    },

    onChangeS(obj){
        this.sector.id = obj.value;
    },

    fetchTanque(){
      axios.get('tanques').then(response => {
         this.tan = response.data.data.data;

     });
    },

      fetchCentral(page){
         axios.get('/central?page='+ page).then(response => {
           this.central = response.data.data.data;
           this.pagination = response.data.pagination;
        });

      },

      changePage(page){
          //console.log(page);
          this.pagination.current_page = page;
          this.fetchCentral(page);
      },

      fetchSector(){
        axios.get('sectorT').then(response => {
            this.sec = response.data.sector;
           //console.log(response.data.sector);
        });
      },

      fetchParroquia(){
        axios.get('parroquia').then(response => {
            this.parro = response.data;

        });
      },

      saveCentral(newCentral){

        var input = this.newCentral;
        var name = input['name'];
        var address = input['address']

         if((name && address) == ""){
         
          this.hasError = false;
          this.hasDeleted = true;
          
          swal({
            title: "Oops...",
              text:  'Tiene campos en blanco!',
               type: 'error' 
              })
        }
        else
        {
            this.newCentral.parish_id = this.parroquia.id;
            this.newCentral.sector_id =this.sector.id;
            this.newCentral.tanks_id = this.tanque.id;
              this.hasError=true;
               axios.post(post_central, this.newCentral).then(response => {
                 swal({
                title: "Success",
                text: 'Registro Guardado',
                type: 'success',
                animation: 'slide-from-bottom',
                timer: 3000
            });
                 
               this.fetchCentral();
               this.showModal= false;
               });
        }

      },
      onEdit(b)
      {
        var showUser = '/show_c/';
        var that = this;
        that.showModal1 = true;
        axios.get(showUser + b.id).then(response => {
            this.editCentral = response.data;
        });
      },
      updateCentral(editCentral){
        var input = this.editCentral;
        var update = '/update_c/' + input.id;
        axios.put(update, input).then(response => {
          swal({
                title: "Success",
                text: 'Registro actualizado',
                type: 'success',
                animation: 'slide-from-bottom',
                timer: 3000
            });
            this.fetchCentral();
            this.showModal1= false;
        });
      },
      onDelete(b){
        var that = this;
        var delCentral = '/central_del/';
        //console.log(delCentral + "/"+ b.id);

        swal({
          title: '¿Estas seguro de eliminar el registro?',
          text: 'Luego de eliminar no podras recuperar el registro',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        }).then(function(){
          axios.delete(delCentral +  b.id).then(response => {
            //console.log("eliminado");
            that.fetchCentral();
          });
        })
      }
  }

}
</script>

<style>

.simple-root {
  margin-top: 20%;
  margin-left: auto;
  margin-right: auto;
}
.help.is-danger {
  color: red;
}
.form-control.is-danger {
  border: 1px solid red;
}



/* enable absolute positioning */
.inner-addon {
    position: relative;
}

/* style icon */
.inner-addon .fa {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}

/* align icon */
.left-addon .fa  { left:  0px;}
.right-addon .fa { right: 0px;}

/* add padding  */
.left-addon input  { padding-left:  30px; }
.right-addon input { padding-right: 30px; }


.tabled{
    background-color: white;
     opacity:0.9; /* Opacidad 90% */
     border-radius: 2px;
     border-bottom: 2px;
}
/* Table css Start */
a.del
{
    background:#d9534f;
    border-radius: 2px;
    width: 35px;
    height:28px;
    padding-left:12px;
    line-height:10px;
}

a.edit
{
    padding-left:10px;
    background:#337ab7;
    color:#fff;
    border-radius:2px;
    border:none;
}

tr.row-name
{
    font-size: 18px;
    color:#448aff;
}

tr.row-content
{
    color:#6c7173;

}

 th  {
   text-align: center;
  padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 30px;
}

td  {
  text-align: center;
 padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 30px;
}

table
{
    border-bottom: 8px solid #448aff;



}

td.check
{
    text-align: center;

}

.table-striped>tbody>tr:nth-of-type(odd)
{
    background:#F0F2F2 !important;
}

a.btn-danger:hover
{
    background: #de6c69;
}

a.btn-danger
{
    background:#d9534f;
}

a.btn-top
{
    /*background:#448aff;*/
    color:#fff;
    border:1px solid #448aff;
    padding: 7px 10px;
    border-radius:4px;
}

a.btn-top:hover
{
    text-decoration: none;
    box-shadow:3px 3px 5px #222;
    transition:box-shadow 0.5s;
}

a.btn-t
{

    color:#fff;
    border:1px solid #448aff;
    padding: 7px 10px;
    border-radius:4px;
    width: 20%;
}



a.btn-t:hover
{
    text-decoration: none;
    box-shadow:3px 3px 5px #222;
    transition:box-shadow 0.5s;
}
/* Table css End */

/*modal*/
.Modal__container {
    max-width: 700px;
    width: 90%;
    background: white;
    border-radius: 2px;
    animation-duration: 0.3s;
    animation-delay: 0s;
}

.Modal__header {
    border-bottom: 1px solid white;
    padding: 15px 10px;
    background-color: silver;
    color: white;
    border-radius: 2px;
}

.Modal__header > h1 {
    font-size: 27px;
    font-weight: normal;
    margin: 0;
}

.Modal__content {
    padding: 10px;
}

.Modal__footer {
    padding: 5px;
}

.u-overlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.naked-link {
    color: inherit;
    text-decoration: inherit;
}
</style>
