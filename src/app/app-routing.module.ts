import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawAnnotationComponent } from './draw-annotation/draw-annotation.component';

const routes: Routes = [
  {
    path: '',
    component: DrawAnnotationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
