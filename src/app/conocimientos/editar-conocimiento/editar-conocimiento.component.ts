import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriaSkill } from '../CategoriaSkill.model';
import { Skill } from '../Skill.model';
import { SkillService } from '../skill.service';
import I18n from 'src/assets/I18n.json';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/Shared/services/language.service';

@Component({
  selector: 'app-editar-conocimiento',
  templateUrl: './editar-conocimiento.component.html',
  styleUrls: ['./editar-conocimiento.component.css']
})
export class EditarConocimientoComponent implements OnInit {

  @Input() skillAEditar?: Skill
  @Output() onEditEvent = new EventEmitter();

  nombreSkillEditada: String | undefined = "";
  avanceEditado: number | undefined = 0;
  catSkillEditada: number | undefined
  categorias: CategoriaSkill[] = []
  idCatSkillEditada: number | undefined ;
  idSkillEditada: number | undefined = 0;

  ediciones = I18n.ediciones.skill
  botones = I18n.boton
  titulo = I18n.seccion.skills.edit
  idiomaEspanol:boolean =true
  esEspanolSub: Subscription = new Subscription;

  constructor(private conocimientoService: SkillService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.conocimientoService.getCateSkills().subscribe(data => {    
      this.categorias = data;
  })

  this.esEspanolSub = this.languageService.esEspanol.subscribe((isAuthenticated: boolean)=>{
    this.idiomaEspanol = isAuthenticated
  })
}

  /* Esta función está para que aparezca el contenido de la educación iterada, porque el componente se crea antes de llegue educacionAEditar */
ngOnChanges(changes: SimpleChanges) {
  this.idSkillEditada = this.skillAEditar?.idSkill;
  this.nombreSkillEditada = this.skillAEditar?.nombreSkill;
  this.catSkillEditada = this.skillAEditar?.catSkill;
  this.avanceEditado = this.skillAEditar?.avance;

}

  ngOnDestroy() {
    this.esEspanolSub.unsubscribe();
  }
  
  onEdit(){
    this.catSkillEditada = this.categorias?.find(categoria => categoria.idCatSkill == this.idCatSkillEditada)?.idCatSkill;
    
    if (this.nombreSkillEditada && this.avanceEditado && this.idSkillEditada && this.catSkillEditada) {
      const { idSkillEditada, nombreSkillEditada, avanceEditado, catSkillEditada } = this
      const skillEditada: Skill = { idSkill: idSkillEditada, nombreSkill: nombreSkillEditada, avance: avanceEditado, catSkill: catSkillEditada };

      if (skillEditada !== undefined) {
        this.conocimientoService.updateSkill(skillEditada).subscribe(data => {
          
          this.onEditEvent.emit();
        }, err => { alert(this.idiomaEspanol ? "Algo salió mal" : "Something went wrong") })

      } 

    } else {
      alert(this.idiomaEspanol ?
         "¡Debe completar todos los campos! No deje vacía la categoría" 
      : "You must complete all fields! Do not leave the category box empty")
    }


  }

}