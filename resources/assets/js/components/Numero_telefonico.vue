<template>
  <div class="container-fluid">
    <section class="content-header">
         <h1>

           <small></small>
         </h1>
         <ol class="breadcrumb">
           <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
           <li class="active">Numero Telefonico</li>
         </ol>
       </section>
<div class="tabled">
    <br>

    <h3 style="text-align: center;">Numeros Telefonicos</h3>

    <div style="padding: 5px">

      <a class="btn-t btn-primary pull-left" href="#" v-on:click.prevent
      ="showModal=true"> <i class="fa fa-user-plus" aria-hidden="true"></i>Nuevo Numero Telefonico</a>

    </div>

    <!-- For markup truncated -->

    <table class="table table-striped">
      <tr  class="row-name">
        <th>#</th>
        <th>Codigo</th>
        <th>Numero</th>
        <th>Estatus</th>
        <th>Cable Central</th>
        <th>Cable Local</th>
        <th>Par Central</th>
        <th>Par Local</th>
        <th>IDManga</th>
        <th>Editar</th>


      </tr>
      <tr v-for="b in numberT"  class="row-content">
        <td>{{ b.id }}</td>
        <td>{{ b.code }}</td>
        <td>{{b.number}}  </td>
        <td>{{b.status}}</td>
        <td>{{b.cc}}</td>
        <td>{{b.cl}}</td>
        <td>{{b.pc}}</td>
        <td>{{b.pl}}</td>
        <td>{{ b.sleeve_id }}</td>


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
          <i class="fa fa-user"></i> Registro de Numero Telefonico

        </div>
        <div slot="body">
          <form class="form">

            <div class="form-group inner-addon left-addon">

               <v-select v-model="newNumber.code" placeholder="Selecciona Codigo de area"  :options="code"></v-select>

            </div>

             <div class="form-group inner-addon left-addon">
               <i class="fa fa-phone" aria-hidden="true"></i>
              <input maxlength="7" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('number') }" v-model="newNumber.number" type="text" class="form-control" placeholder="Numero Telefonico" name="number">
             <span v-show="errors.has('number')" class="help is-danger">{{ errors.first('number') }}</span>

            </div>
            <div class="form-group inner-addon left-addon">

              <select v-model="newNumber.status" class="form-control">
                
                <option>En Espera</option>
              </select>
            </div>

            <div class="form-group inner-addon left-addon">

             <v-select :value="manga.id" v-model="newNumber.sleeve_id" placeholder="Selecciona una manga"  :options="SelectMan" :on-change="onChangeM"><span slot="no-options">Porfavor Carga una manga en su modulo</span></v-select>

            </div>


            <div  class="form-group col-xs-3">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('cc') }" v-model="newNumber.cc" type="text" class="form-control" placeholder="Cable Central" name="cc">
             <span v-show="errors.has('cc')" class="help is-danger">{{ errors.first('cc') }}</span>
            </div>

            <div class="form-group col-xs-3">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('cl') }" v-model="newNumber.cl" type="text" class="form-control" placeholder="Cable Local" name="cl">
             <span v-show="errors.has('cl')" class="help is-danger">{{ errors.first('cl') }}</span>
            </div>

            <div class="form-group col-xs-3">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pc') }" v-model="newNumber.pc" type="text" class="form-control" placeholder="Par Central" name="pc">
             <span v-show="errors.has('pc')" class="help is-danger">{{ errors.first('pc') }}</span>
            </div>




            <div class="form-group col-xs-3">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pl') }" v-model="newNumber.pl" type="text" class="form-control" placeholder="Par Local" name="pl">
             <span v-show="errors.has('pl')" class="help is-danger">{{ errors.first('pl') }}</span>
            </div>


          </form>

        </div>
        <div slot="footer">

        <a href="#" class="btn btn-primary" v-on:click.prevent="saveNumber()">Guardar</a>

          <a href="#" class="btn btn-default" v-on:click.prevent="showModal=false">Cerrar</a>

        </div>
      </modal>
                        <!-- -->

                        <modal :display="showModal1" @close="showModal1 = false">
                          <div slot="header">
                            <i class="fa fa-user"></i> Actualizacion de Numero Telefonico

                          </div>
                          <div slot="body">
                            <form class="form">

                              <div class="form-group inner-addon left-addon">

                                 <v-select v-model="editNumber.code" placeholder="Selecciona Codigo de area"  :options="code"></v-select>

                              </div>

                               <div class="form-group inner-addon left-addon">
                                 <i class="fa fa-phone" aria-hidden="true"></i>
                                <input maxlength="7" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('number') }" v-model="editNumber.number" type="text" class="form-control" placeholder="Numero Telefonico" name="number">
                               <span v-show="errors.has('number')" class="help is-danger">{{ errors.first('number') }}</span>

                              </div>
                              <div class="form-group inner-addon left-addon">

                                <select v-model="editNumber.status" class="form-control">
                                  
                                  <option>En Espera</option>
                                </select>
                              </div>

                              <div class="form-group inner-addon left-addon">

                               <v-select :value="manga.id" v-model="editNumber.sleeve_id"  :options="SelectMan" :on-change="onChangeM"><span slot="no-options">Porfavor Carga una manga en su modulo</span></v-select>

                              </div>


                              <div  class="form-group col-xs-3">
                                <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('cc') }" v-model="editNumber.cc" type="text" class="form-control" placeholder="Cable Central" name="cc">
                               <span v-show="errors.has('cc')" class="help is-danger">{{ errors.first('cc') }}</span>
                              </div>

                              <div class="form-group col-xs-3">
                                <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('cl') }" v-model="editNumber.cl" type="text" class="form-control" placeholder="Cable Local" name="cl">
                               <span v-show="errors.has('cl')" class="help is-danger">{{ errors.first('cl') }}</span>
                              </div>

                              <div class="form-group col-xs-3">
                                <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pc') }" v-model="editNumber.pc" type="text" class="form-control" placeholder="Par Central" name="pc">
                               <span v-show="errors.has('pc')" class="help is-danger">{{ errors.first('pc') }}</span>
                              </div>




                              <div class="form-group col-xs-3">
                                <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pl') }" v-model="editNumber.pl" type="text" class="form-control" placeholder="Par Local" name="pl">
                               <span v-show="errors.has('pl')" class="help is-danger">{{ errors.first('pl') }}</span>
                              </div>


                            </form>

                          </div>
                          <div slot="footer">

                          <a href="#" class="btn btn-primary" v-on:click.prevent="updateNumber()">Guardar</a>

                            <a href="#" class="btn btn-default" v-on:click.prevent="showModal1=false">Cerrar</a>

                          </div>
                        </modal>





  </div>
</div>

</template>


<script>
var getnumber = 'numero_telefonico';
var postnumber = 'numero_save';

export default {

  data(){
      return {
        numberT: [],
        showModal:false,
        showModal1:false,
        newNumber:{
          code:'',
          number:'',
          status:'En Espera',
          cc:'',
          cl:'',
          pc:'',
          pl:'',
          sleeve_id:''
        },
        editNumber:{
          code:'',
          number:'',
          status:'En Espera',
          cc:'',
          cl:'',
          pc:'',
          pl:'',
          sleeve_id:''
        },
        manga:{
          id:''
        },
          man:[],
        code:['0241','0245','0249','0242'],
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
    this.fetchNumber(this.pagination.current_page);
    this.fetchSleeve();

  },
  computed:{
    SelectMan(){
      return this.man.map(g =>(
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
    onChangeM(obj){
        this.manga.id = obj.value;
    },
    fetchSleeve(){
        axios.get('manga1').then(response => {
            this.man = response.data;
        });
    },
      fetchNumber(page){
         axios.get('/numero_telefonico?page=' + page).then(response => {
            //this. = response.data.numberT;
            this.numberT = response.data.data.data;
            this.pagination = response.data.pagination;
        });

      },
      changePage(page){
          //console.log(page);
          this.pagination.current_page = page;
          this.fetchNumber(page);
      },
      saveNumber(newNumber){
        var input = this.newNumber
        var code = input['code']
        var number = input['number']
        var status = input['status']
        var cc = input['cc']
        var cl = input['cl']
        var pc = input['pc']
        var pl = input['pl']

        if((code && number && status && cc && cl && pc && pl) == ""){
         
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
            this.newNumber.sleeve_id = this.manga.id;
              this.hasError=true;
               axios.post(postnumber, this.newNumber).then(response => {
                   swal({
                title: "Success",
                text: 'Registro Guardado',
                type: 'success',
                animation: 'slide-from-bottom',
                timer: 3000
            });
               this.fetchNumber();
               this.showModal=false;
               });

        }



      },
      onEdit(b){
        var showUser = '/showNum/';
        var that = this;
        that.showModal1 = true;
        axios.get(showUser + b.id).then(response => {
            this.editNumber = response.data;
        });
      },
      updateNumber(editNumber){
        var input = this.editNumber;
        var update = '/update_N/' + input.id;


        axios.put(update, input).then(response => {
          swal({
                title: "Success",
                text: 'Registro actualizado',
                type: 'success',
                animation: 'slide-from-bottom',
                timer: 3000
            });
            this.fetchNumber();
            this.showModal1= false;

        });
      },
      ondelete(b)
      {
        var that = this;
        var delNumber = '/numero_delete/';
        //console.log(delUsers + "/"+ b.id);

        swal({
          title: '¿Estas seguro de eliminar el registro?',
          text: 'Luego de eliminar no podras recuperar el registro',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        }).then(function(){
          axios.delete(delNumber +  b.id).then(response => {
            //console.log("eliminado");
            that.fetchNumber();
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
