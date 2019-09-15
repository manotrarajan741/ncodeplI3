import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { OrderByPipe } from './sort/sort';
@NgModule({
	declarations: [
    SearchPipe,
    OrderByPipe],
	imports: [],
	exports: [
    SearchPipe,
    OrderByPipe]
})
export class PipesModule {}
