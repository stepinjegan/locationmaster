import { Component, OnInit, Input } from '@angular/core';
import { MapService } from 'src/app/shared/map.service';
import { NgForm } from '@angular/forms';
import { Map } from 'src/app/shared/map.model';
import { JsonpInterceptor } from '@angular/common/http';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  
  public polycoords: Array<any>=[];
  map:Map;
  isExist:boolean =false;
  ines:boolean =false;
  isConnected = false;
  status: string;
  a=[];
  data=[];
  
 

  
    
  

  constructor(public service:MapService) {
    this.isConnected = false;
   }

  ngOnInit(): void {
    this.service.polycoords.subscribe(res => {
      this.polycoords = res 
      // let polystring = JSON.stringify(this.polycoords);
      this.service.formdata.geofence=this.polycoords;


      this.service.isAvailable().then(() => {
        this.status = 'OK';
        this.isConnected = true;
      }, error => {
        this.status = 'ERROR';
        this.isConnected = false;
        console.error('Server is down', error);
      }).then(() => {
       
      });
    })
    
    console.log(this.polycoords);
   
    
   
    this.get();

    // this.getes();
    this.resetFrom();

  
  
  }
  onsubmit(form:NgForm){
    

    // this.service.addToIndex({
    //   index: 'ralocation',
    //   type: '_doc',
     
    
    //   body: {
    //     isActive: true,
    //     name:  form.value.name,
    //     shortCode:form.value.shortCode,
    //     geofence: {
    //       type: "polygon",
    //       coordinates:[form.value.geofence]
        
      
    //     }
    //   }
    // }).then((result) => {
    //   console.log(result);
    //   alert('added to es');
    // }, error => {
    //   alert('error in adding to es');
    //   console.error(error);
    // });


  
    
   
    
    this.insertrecord(form);
   

    


  


    form.resetForm();
    
    
    
  }
 get(){
  this.service.getmap().subscribe((res:any[])=>{
    this.a=res;
    console.log(this.a);
    
  })
 }

  insertrecord(form: NgForm){
    this.service.postmap(form.value).subscribe(res => {
      this.isExist = false;
      console.log(res);
      this.get();
      
    },
    error =>{
        this.isExist=false;
        if(error.status==422)
        this.isExist=true;
        console.log("already exit");
    })
    

  }
//   getes(){
//   this.service.getes('ralocation', '_doc')
//   .then(response => {
//     this.data = response.hits.hits;
//     console.log(response);
//   }, error => {
//     console.error(error);
//   }).then(() => {
    
//   });
// }
  toes(id,isActive,name,shortCode,geofence){

    this.service.addToIndex({
      index: 'ralocation',
      type: '_doc',
      id: id,
      body: {
        isActive: isActive,
        name:  name,
        shortCode:shortCode,
        geofence: {
          type: "polygon",
          coordinates:[geofence]
        
      
        }
      }
    }).then((result) => {
      console.log(result);
      alert('added to es');
    }, error => {
      this.ines=false;
        if(error.status==409)
        this.ines=true;
        console.log("already exit");
      
      console.error(error);
    });


  }

  resetFrom(form?:NgForm){
    if (form!=null)
    form.resetForm();
    this.service.formdata ={
      name:'',
      shortCode:'',
      geofence:[]
    }
  }

}