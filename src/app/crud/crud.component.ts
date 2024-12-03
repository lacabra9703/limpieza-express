import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoModel } from '../../modelo/registro';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {

  productObj:ProductoModel = new ProductoModel();
  productForm:FormGroup = new FormGroup({});
  productList:ProductoModel[] = [];
  
  constructor()
  {
    this.crearFormulario();
    const oldData = localStorage.getItem("dataProd");
    if(oldData!=null)
    {
      //Convirtiendo los datos a tipo JSON 
      const parseData = JSON.parse(oldData);
      this.productList = parseData;
    }

  }

  crearFormulario()
  {
    this.productForm = new FormGroup({
      id: new FormControl(this.productObj.id),
      nombre: new FormControl(this.productObj.nombre, [Validators.required]),
      servicio: new FormControl(this.productObj.servicio, [Validators.required, Validators.minLength(3)])
    });  
  }

  onSave(){
    const oldData = localStorage.getItem("dataProd");
    if(oldData!=null)
    {
      const parseData = JSON.parse(oldData);
      this.productForm.controls['id'].setValue(parseData.length+1);
      this.productList.unshift(this.productForm.value);
    }
    else
    {
      this.productList.unshift(this.productForm.value);
    }
    localStorage.setItem("dataProd", JSON.stringify(this.productList));
    this.limpiar();
  }

  onEdit(item:ProductoModel)
  {
    this.productObj=item;
    this.crearFormulario();
  }

  limpiar(){
    this.productObj=new ProductoModel;
    this.crearFormulario();
  }

  onUpdate()
  {
    const registro = this.productList.find(m=>m.id == this.productForm.controls['id'].value);
    if(registro != undefined){
      registro.nombre = this.productForm.controls['nombre'].value;
      registro.servicio = this.productForm.controls['servicio'].value;
    }
    localStorage.setItem("dataProd", JSON.stringify(this.productList));
    this.limpiar();
  }

  onDelete(id:number){
    const borrar = confirm("¿Está seguro de eliminar este registro?");
    if (borrar) 
      {
      const indice = this.productList.findIndex(m=>m.id ==id);
      this.productList.splice(indice,1);
    }
    localStorage.setItem("dataProd", JSON.stringify(this.productList));
  }

}
