<template>
  <div class="container-fluid">
    <section class="content-header">
         <h1>

           <small></small>
         </h1>
         <ol class="breadcrumb">
           <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
           <li class="active">Manga</li>
         </ol>
       </section>
  <div class="tabled">
      <br>

      <h3 style="text-align: center;">Manga</h3>

      <div style="padding: 5px">

        <a class="btn-t btn-primary pull-left" href="#" v-on:click.prevent
        ="showModal=true"> <i class="fa fa-user-plus" aria-hidden="true"></i>Nueva manga</a>

      </div>

      <!-- For markup truncated -->

      <table class="table table-striped">
        <tr  class="row-name">
          <th>#</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Direccion</th>


          <th>Fecha</th>
          <th>Editar</th>


        </tr>
        <tr v-for="b in manga"  class="row-content">
          <td>{{ b.id }}</td>
          <td>{{ b.name }}</td>
          <td> {{b.description}} </td>
          <td>{{ b.address }}</td>
          <td>{{b.created_at}}</td>


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
            <i class="fa fa-user"></i> Registro de Manga

          </div>
          <div slot="body">
            <form class="form">

              <div class="form-group inner-addon left-addon">
                 <i class="fa fa-user" aria-hidden="true"></i>
                <input v-validate="'required'" v-model="newManga.name" type="text" class="form-control" placeholder="Nombre de manga" :class="{'input': true, 'is-danger': errors.has('name') }">
               <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>

              </div>
               <div class="form-group inner-addon left-addon">
                 <i class="fa fa-phone" aria-hidden="true"></i>
                <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('description') }" v-model="newManga.description" type="text" class="form-control" placeholder="Descripcion" name="description">
               <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>

              </div>
              <div class="form-group inner-addon left-addon">
               <i class="fa fa-key" aria-hidden="true"></i>
               <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('address') }" v-model="newManga.address" type="text" class="form-control" placeholder="Direccion" name="address">
              <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>

              </div>




            </form>

          </div>
          <div slot="footer">

          <a href="#" class="btn btn-primary" v-on:click.prevent="saveManga()">Guardar</a>

            <a href="#" class="btn btn-default" v-on:click.prevent="showModal=false">Cerrar</a>

          </div>
        </modal>
        <!-- -->

        <modal :display="showModal1" @close="showModal1 = false">
          <div slot="header">
            <i class="fa fa-user"></i> Actualizacion de Manga

          </div>
          <div slot="body">
            <form class="form">

              <div class="form-group inner-addon left-addon">
                 <i class="fa fa-user" aria-hidden="true"></i>
                <input v-validate="'required'" v-model="editManga.name" type="text" class="form-control" placeholder="Nombre de manga" :class="{'input': true, 'is-danger': errors.has('name') }">
               <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>

              </div>
               <div class="form-group inner-addon left-addon">
                 <i class="fa fa-phone" aria-hidden="true"></i>
                <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('description') }" v-model="editManga.description" type="text" class="form-control" placeholder="Descripcion" name="description">
               <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>

              </div>
              <div class="form-group inner-addon left-addon">
               <i class="fa fa-key" aria-hidden="true"></i>
               <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('address') }" v-model="editManga.address" type="text" class="form-control" placeholder="Direccion" name="address">
              <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>

              </div>




            </form>

          </div>
          <div slot="footer">

          <a href="#" class="btn btn-primary" v-on:click.prevent="updateManga()">Guardar</a>

            <a href="#" class="btn btn-default" v-on:click.prevent="showModal1=false">Cerrar</a>

          </div>
        </modal>

    </div>
  </div>
</template>

<script>
var getManga = '/manga';
var postManga = '/manga_save';

export default {

  data(){
      return {
        manga: [],
        showModal:false,
        showModal1:false,
        newManga:{
          name:'',
          description:'',
          address:''
        },
        editManga:{
          name:'',
          description:'',
          address:''
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
    this.fetchManga(this.pagination.current_page);

  },

  computed:{
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
      fetchManga(page){
         axios.get('/manga?page=' + page).then(response => {

          //  this.manga = response.data.manga;
            this.manga = response.data.data.data;
            this.pagination = response.data.pagination;
        });

      },

      changePage(page){
          //console.log(page);
          this.pagination.current_page = page;
          this.fetchManga(page);
      },
      onEdit(b){
        var showUser = '/show_m/';
        var that = this;
        that.showModal1 = true;
        axios.get(showUser + b.id).then(response => {
            this.editManga = response.data;
        });
      },
      onDelete(b){
        var that = this;
        var delAds = '/manga_del/';
        //console.log(delUsers + "/"+ b.id);

        swal({
          title: '¿Estas seguro de eliminar el registro?',
          text: 'Luego de eliminar no podras recuperar el registro',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        }).then(function(){
          axios.delete(delAds +  b.id).then(response => {
            //console.log("eliminado");
            that.fetchManga();
          });
        })
      },
      updateManga(editManga){
        var input = this.editManga;
        var update = '/update_m/' + input.id;
        axios.put(update, input).then(response => {
          swal({
                title: "Success",
                text: 'Registro actualizado',
                type: 'success',
                animation: 'slide-from-bottom',
                timer: 3000
            });
            this.fetchManga();
            this.showModal1= false;
        });
      },
      saveManga(newManga){
        var input = this.newManga;
        
        var name = input['name']
        var description = input['description']
        var address = input['address']


         if((name && description && address) == ""){
         
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
              this.hasError=true;
               axios.post(postManga, this.newManga).then(response => {

                swal({
                title: "Success",
                text: 'Registro Guardado',
                type: 'success',
                animation: 'slide-from-bottom',
                timer: 3000
            });

               this.fetchManga();
               this.showModal=false;
               });
        }
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
