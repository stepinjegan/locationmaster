import { Component,OnInit} from '@angular/core';
import { MapService } from 'src/app/shared/map.service';
import { ThrowStmt, analyzeAndValidateNgModules, ResourceLoader } from '@angular/compiler';
import { JsonPipe } from '@angular/common';
import { PolylineManager } from '@agm/core';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  {
  
public coordsval;
public point:boolean=false;

  constructor(public service:MapService) { }
  
 
  
  // parentMessage = "message from parent"
  ngOnInit() {
    // this.service.changeMessage(this.testcoords);
    
  }
  newMessage() {
    
    
  }
  
  center: any = {
    lat: 12.9716,
    lng: 77.5946
  };

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    var drawingManager = new google.maps.drawing.DrawingManager(options);
    
    drawingManager.setMap(map);
    
   
 
    
     google.maps.event.addListener(drawingManager, 'polygoncomplete',  (polygon) => {
      const len = polygon.getPath().getLength();
      const polyArrayLatLng = [];
      
   

    
      for (let i = 0; i < len; i++) {
        const vertex = polygon.getPath().getAt(i);
        const vertexLatLng = [ vertex.lat(), vertex.lng()];
        polyArrayLatLng.push(vertexLatLng);
      }
      // the last point of polygon should be always the same as the first point (math rule)
      polyArrayLatLng.push(polyArrayLatLng[0]);
      this.coordsval = polyArrayLatLng
      this.updatelatlong(this.coordsval);
 

     console.log("test",polyArrayLatLng);
      if(polyArrayLatLng.length<=3)
      {
        drawingManager.setMap();
        this.point=true;
       
        
       
        
      }
    
      
       
     
      // const a=[];
       console.log('coordinates',polyArrayLatLng);
      //  const array=polyArrayLatLng.map(s=>{
      //    a.push(s.lat,s.lng);
      //  })
     
       
      //  console.log("hlo",a);
      
      
       
    //  for(var j=0;j<4;j++){

    //   this.a.push(polyArrayLatLng[j].lat,polyArrayLatLng[j].lng);

    //  }
    

    // console.log('push',this.a);
// for( var j=0;j<1;j++){
//   for(var k=0;k<=6;k+2){
//      for( var i=k;i<2;i++){
//          this.b[k]=this.a[k];
//          console.log(this.b);
//        }
//        this.c[j]=this.b;
//       }       

//   }
    // console.log(this.c);

   
       return polyArrayLatLng; 

   
    
  });
 
  
  
  
  
    
  
  
  

  }
  public updatelatlong(coordsval){
    this.service.changeCoords(coordsval);
    console.log(coordsval);
  }
  
  


}