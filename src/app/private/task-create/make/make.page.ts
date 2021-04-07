import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {HttpHeaders} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {NavController} from "@ionic/angular";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-make',
    templateUrl: './make.page.html',
    styleUrls: ['./make.page.scss'],
    providers: [DatePipe]
})
export class MakePage implements OnInit {
    categoryType: string = null;
    categoryId: number = 0;
    cityId: number = 0;
    title: string = 'Создание заявки';
    makeForm: any;
    stages: boolean = false;
    checkList: boolean = true;
    safe: boolean = false;
    budget: boolean = false;
    step: number = 1;
    totalSteps: number = 5;
    defaultBack: string = '';
    stepsNumbers: any;
    apiKey: string = null;
    stagesContractPrices: any;
    redirect: boolean = false;
    url: any = null;
    rules: boolean = false;

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private api: ApiService,
                private sanitizer: DomSanitizer, private nav: NavController, public datePipe: DatePipe) {
        this.stepsNumbers = {
            stages: 0,
            name: 2,
            price: 3,
            date: 4,
            make: 5
        };

        this.stagesContractPrices = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        };

        this.makeForm = new FormGroup({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(3)
            ])),
            description: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(10)
            ])),
            price: new FormControl(),
            dateStart: new FormControl(),
            dateEnd: new FormControl(),
            contractPrice: new FormControl(),
            stage1: new FormControl(),
            stage2: new FormControl(),
            stage3: new FormControl(),
            stage4: new FormControl(),
            stage5: new FormControl(),
            stagePrice1: new FormControl(),
            stagePrice2: new FormControl(),
            stagePrice3: new FormControl(),
            stagePrice4: new FormControl(),
            stagePrice5: new FormControl(),
            checkList1: new FormControl(),
            checkList2: new FormControl(),
            checkList3: new FormControl(),
            checkList4: new FormControl(),
            checkList5: new FormControl(),
        });
    }

    ngOnInit() {
        this.api.apiKey.subscribe(apiKey => this.apiKey = apiKey);
    }

    ionViewWillEnter() {
        this.step = 1;
        if (this.route.snapshot.paramMap.get('categoryType') !== undefined
            && this.route.snapshot.paramMap.get('categoryId') !== undefined
            && this.route.snapshot.paramMap.get('cityId') !== undefined) {
            this.categoryType = this.route.snapshot.paramMap.get('categoryType');
            this.categoryId = parseInt(this.route.snapshot.paramMap.get('categoryId'));
            this.cityId = parseInt(this.route.snapshot.paramMap.get('cityId'));
            this.defaultBack = `/private/task-create/select-city/${this.categoryType}/${this.categoryId}`;
        }
    }

    changeSafe() {
        this.safe = !this.safe;
    }

    changeBudget() {
        this.budget = !this.budget;
    }

    changeStagePrice(i: number) {
        this.stagesContractPrices[i] = !this.stagesContractPrices[i];
    }

    submit(makeForm: any) {
        let data = {};
        data['cityId'] = this.cityId;
        data['categoryId'] = this.categoryId;
        data['name'] = makeForm['value']['name'];
        data['description'] = makeForm['value']['description'];

        if (makeForm['value']['dateStart'] !== null) {
            data['dateStart'] = this.datePipe.transform(makeForm['value']['dateStart'], 'dd.MM.yyyy');
        }

        if (makeForm['value']['dateEnd'] !== null) {
            data['dateEnd'] = this.datePipe.transform(makeForm['value']['dateEnd'], 'dd.MM.yyyy');
        }

        if (!this.budget) {
            if (makeForm['value']['price'] !== null) {
                data['price'] = makeForm['value']['price'];
            }
        }

        if (this.safe) {
            data['security'] = 1;
        }

        if (this.stages) {
            let _stages = [];
            for (let i in [1, 2, 3, 4, 5]) {
                if (makeForm['value']['stage' + i] !== undefined && makeForm['value']['stage' + i] !== null
                    && makeForm['value']['stagePrice' + i] !== undefined) {
                    _stages.push({
                        'name': makeForm['value']['stage' + i],
                        'price': (makeForm['value']['stagePrice' + i] !== null) ? makeForm['value']['stagePrice' + i] : 0
                    });
                }
            }

            if (_stages.length) {
                data['stages'] = _stages;
            }
        }

        let _check = [];
        for (let i in [1, 2, 3, 4, 5]) {
            if (makeForm['value']['checkList' + i] !== null && makeForm['value']['checkList' + i] !== undefined) {
                _check.push(makeForm['value']['checkList' + i]);
            }
        }

        if (_check.length) {
            data['response-checklist'] = _check;
        }

        if (this.rules) {
            this.api._post('createtask', data, new HttpHeaders({'X-PI-KEY': this.apiKey})).toPromise()
                .then(data => {
                    this.api.getUser(this.apiKey);
                    if (data['result']['redirect'] !== null) {
                        this.redirect = true;
                        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data['result']['redirect']);
                    } else {
                        if (data['result']['moderation']) {
                            this.nav.navigateForward(`/private/task-create/moderation`);
                        } else {
                            this.nav.navigateForward(`/private/task-create/success`);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            alert('Для продолжения, необходимо ознакомиться с пользовательским соглашением, и принять его условия.');
        }
    }

    next() {
        if (this.step < this.totalSteps)
            this.step++;
    }

    back() {
        if (this.step > 1)
            this.step--;
    }

    changeType(type: string) {
        switch (type) {
            case 'single':
                for (let i in this.stepsNumbers) {
                    this.stepsNumbers[i]--;
                }
                this.stepsNumbers.stages = 0;
                break;
            case 'multiple':
                for (let i in this.stepsNumbers) {
                    this.stepsNumbers[i]++;
                }
                this.stepsNumbers.stages = 2;
                break;
        }

        this.totalSteps = this.stepsNumbers.make;
        this.stages = (this.stepsNumbers.stages > 0);
    }

    agree() {
        this.rules = !this.rules;
    }
}
