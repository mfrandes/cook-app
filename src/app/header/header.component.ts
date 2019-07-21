import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() featureSelected = new EventEmitter<string>();
    isAutheticated = false;
    private userSub: Subscription;

    constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

    ngOnInit(){
        this.authService.user.subscribe(user => {
            this.isAutheticated = !user? false : true;  /* also works !!user  */
        })
    }

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
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}