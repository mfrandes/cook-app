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
        this.dataStorage.storeRecipes();
    }
    onFetchData(){
        this.dataStorage.fetchRecipes();
    }
}