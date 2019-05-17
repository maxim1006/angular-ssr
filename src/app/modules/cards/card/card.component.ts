import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    id;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
    }

}
