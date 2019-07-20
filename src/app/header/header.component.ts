import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() featureSelected = new EventEmitter<string>();

    constructor(private dataStorage: DataStorageService) { }
    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }
    onSaveData() {
        if(confirm("Are you shure you want to save recipes in the database?")){
        this.dataStorage.storeRecipes();
        } else{
            // do nothing :}
        }
    }
    onFetchData(){
        this.dataStorage.fetchRecipes().subscribe();
    }
}