(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/not-found/not-found.component */ "./src/app/components/not-found/not-found.component.ts");
/* harmony import */ var _components_add_event_add_event_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/add-event/add-event.component */ "./src/app/components/add-event/add-event.component.ts");








var routes = [
    { path: "", component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
    { path: "events/new", component: _components_add_event_add_event_component__WEBPACK_IMPORTED_MODULE_7__["AddEventComponent"] },
    { path: "login", component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: "register", component: _components_register_register_component__WEBPACK_IMPORTED_MODULE_5__["RegisterComponent"] },
    { path: "**", component: _components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_6__["NotFoundComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\n                data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">Event Manager</a>\n        </div>\n\n        <!-- Collect the nav links, forms, and other content for toggling -->\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n            <ul class=\"nav navbar-nav\">                \n                <li><a [routerLink]=\"['/']\">Events</a></li>   \n                <li *ngIf=\"loggedIn\"><a [routerLink]=\"['/events/new']\">Add Event</a></li>\n                <li *ngIf=\"!loggedIn\"><a [routerLink]=\"['/login']\">Login</a></li>             \n                <li *ngIf=\"!loggedIn\"><a [routerLink]=\"['/register']\">Register</a></li>\n            </ul>\n\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li *ngIf=\"!loggedIn\"><a href=\"#\">Welcome Guest</a></li>                \n                <li *ngIf=\"loggedIn\"><a href=\"#\">Welcome User</a></li>  \n                <li *ngIf=\"loggedIn\"><a href=\"#\" (click)=\"logout()\">Logout</a></li>              \n            </ul>\n        </div><!-- /.navbar-collapse -->\n    </div><!-- /.container-fluid -->\n</nav>\n\n<div class=\"container-fluid\">\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var AppComponent = /** @class */ (function () {
    function AppComponent(authSvc, router) {
        var _this = this;
        this.authSvc = authSvc;
        this.router = router;
        this.authSvc.isLoggedIn()
            .subscribe(function (res) {
            _this.loggedIn = res;
        });
    }
    AppComponent.prototype.logout = function () {
        this.authSvc.logOut();
        return this.router.navigate(['/']);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: initializeAppConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeAppConfig", function() { return initializeAppConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _interceptors_auth_intercepter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./interceptors/auth-intercepter */ "./src/app/interceptors/auth-intercepter.ts");
/* harmony import */ var _services_configuration_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/configuration.service */ "./src/app/services/configuration.service.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/not-found/not-found.component */ "./src/app/components/not-found/not-found.component.ts");
/* harmony import */ var _components_add_event_add_event_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/add-event/add-event.component */ "./src/app/components/add-event/add-event.component.ts");














function initializeAppConfig(configService) {
    return function () {
        return configService.loadSettings();
    };
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_11__["RegisterComponent"],
                _components_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_12__["NotFoundComponent"],
                _components_add_event_add_event_component__WEBPACK_IMPORTED_MODULE_13__["AddEventComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], useClass: _interceptors_auth_intercepter__WEBPACK_IMPORTED_MODULE_9__["AuthIntercepter"], multi: true },
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_2__["APP_INITIALIZER"], useFactory: initializeAppConfig, deps: [_services_configuration_service__WEBPACK_IMPORTED_MODULE_10__["ConfigurationService"]], multi: true }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/add-event/add-event.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/add-event/add-event.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRkLWV2ZW50L2FkZC1ldmVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/add-event/add-event.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/add-event/add-event.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n        <div class=\"col-md-6 col-md-offset-3\">\n            <div class=\"alert alert-success\" *ngIf=\"status && status.success\">\n                {{status.message}}\n            </div>\n            <div class=\"alert alert-danger\" *ngIf=\"status && status.success===false\">\n                {{status.message}}\n            </div>\n            <h3>New event</h3>\n            <form class=\"form\" [formGroup]=\"form\" (submit)=\"submit()\">\n                <div class=\"form-group\">\n                    <label class=\"control-label\" for=\"title\">Title</label>\n                    <input type=\"text\" class=\"form-control\" formControlName=\"title\" />\n                    <div *ngIf=\"controls.title.invalid && (controls.title.dirty || controls.title.touched)\" class=\"text-danger\">\n                        <div *ngIf=\"controls.title.errors.required\">Event title is required. </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label\" for=\"location\">Event location</label>\n                    <input type=\"text\" class=\"form-control\" formControlName=\"location\" />\n                    <div *ngIf=\"controls.location.invalid && (controls.location.dirty || controls.location.touched)\" class=\"text-danger\">\n                        <div *ngIf=\"controls.location.errors.required\">Location of event is required. </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label\" for=\"startDate\">Start date</label>\n                    <input type=\"date\" class=\"form-control\" formControlName=\"startDate\" />\n                    <div *ngIf=\"controls.startDate.invalid && (controls.startDate.dirty || controls.startDate.touched)\" class=\"text-danger\">\n                        <div *ngIf=\"controls.startDate.errors.required\">Event start date required. </div>                        \n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label\" for=\"endDate\">End date</label>\n                    <input type=\"date\" class=\"form-control\" formControlName=\"endDate\" />\n                    <div *ngIf=\"controls.endDate.invalid && (controls.endDate.dirty || controls.endDate.touched)\" class=\"text-danger\">\n                        <div *ngIf=\"controls.endDate.errors.required\">Event end date is required. </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"control-label\" for=\"contactNo\">Speaker's name</label>\n                    <input type=\"text\" class=\"form-control\" formControlName=\"speaker\" />\n                    <div *ngIf=\"controls.speaker.invalid && (controls.speaker.dirty || controls.speaker.touched)\" class=\"text-danger\">\n                        <div *ngIf=\"controls.speaker.errors.required\">Speaker's name is required. </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                        <label class=\"control-label\" for=\"contactNo\">Event registration Url</label>\n                        <input type=\"url\" class=\"form-control\" formControlName=\"url\" />  \n                        <div *ngIf=\"controls.url.invalid && (controls.url.dirty || controls.url.touched)\" class=\"text-danger\">\n                                <div *ngIf=\"controls.url.errors.required\">Event registration url is required. </div>\n                            </div>                      \n                    </div>\n                <div class=\"form-group\">\n                    <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-success\">Save</button>\n                </div>\n            </form>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/components/add-event/add-event.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/add-event/add-event.component.ts ***!
  \*************************************************************/
/*! exports provided: AddEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEventComponent", function() { return AddEventComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_event_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/event.service */ "./src/app/services/event.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");




var AddEventComponent = /** @class */ (function () {
    function AddEventComponent(fb, eventSvc) {
        this.fb = fb;
        this.eventSvc = eventSvc;
    }
    AddEventComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            "title": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,],
            "location": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            "startDate": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            "endDate": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            "speaker": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            "url": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    Object.defineProperty(AddEventComponent.prototype, "controls", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    AddEventComponent.prototype.submit = function () {
        var _this = this;
        if (this.form.valid) {
            this.eventSvc.addEvent(this.form.value)
                .subscribe(function (result) {
                _this.status = { success: true, message: "New event is added successfully." };
            }, function (err) {
                _this.status = {
                    success: false,
                    message: "Failed to add new event data."
                };
            });
        }
        else {
            this.status = {
                success: false,
                message: "Invalid form data"
            };
        }
    };
    AddEventComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'add-event',
            template: __webpack_require__(/*! ./add-event.component.html */ "./src/app/components/add-event/add-event.component.html"),
            styles: [__webpack_require__(/*! ./add-event.component.css */ "./src/app/components/add-event/add-event.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_services_event_service__WEBPACK_IMPORTED_MODULE_2__["EventService"]])
    ], AddEventComponent);
    return AddEventComponent;
}());



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <table class=\"table table-striped table-bordered\">\n            <tr>\n                <th>Title</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Speaker</th>\n                <th>Location</th>\n            </tr>\n            <tr *ngFor=\"let ev of events|async\">\n                <td>{{ev.title}}</td>\n                <td>{{ev.startDate}}</td>\n                <td>{{ev.endDate}}</td>\n                <td>{{ev.speaker}}</td>\n                <td>{{ev.location}}</td>\n            </tr>\n        </table>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_event_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/event.service */ "./src/app/services/event.service.ts");



var HomeComponent = /** @class */ (function () {
    function HomeComponent(eventSvc) {
        this.eventSvc = eventSvc;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.events = this.eventSvc.getEvents();
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/components/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_event_service__WEBPACK_IMPORTED_MODULE_2__["EventService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n        <div class=\"alert alert-danger\" *ngIf=\"status && status.success===false\">\n            {{status.message}}\n        </div>\n        <h3>Login</h3>\n        <form  [formGroup]=\"form\" (submit)=\"submit()\">            \n            <div class=\"form-group\">                \n                <label class=\"control-label\" for=\"email\">Email</label>\n                <input type=\"email\" name=\"email\" class=\"form-control\" formControlName=\"email\" />\n                <div *ngIf=\"controls.email.invalid && (controls.email.dirty || controls.email.touched)\" class=\"text-danger\">\n                    <div *ngIf=\"controls.email.errors.required\">Email is required. </div>\n                    <div *ngIf=\"controls.email.errors.email\">Invalid email value </div>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"control-label\" for=\"email\">Password</label>\n                <input type=\"password\" class=\"form-control\" formControlName=\"password\" />\n                <div *ngIf=\"controls.password.invalid && (controls.password.dirty || controls.password.touched)\" class=\"text-danger\">\n                    <div *ngIf=\"controls.password.errors.required\">Password is required. </div>\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-success\">Login</button>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/storage.service */ "./src/app/services/storage.service.ts");






var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, authSvc, storageSvc, router) {
        this.fb = fb;
        this.authSvc = authSvc;
        this.storageSvc = storageSvc;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            "email": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email])],
            "password": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "controls", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.submit = function () {
        var _this = this;
        if (this.form.valid) {
            this.authSvc.getToken(this.form.value)
                .subscribe(function (result) {
                _this.storageSvc.setItem("auth-token", result);
                _this.router.navigate(["/"]);
            }, function (err) {
                _this.status = {
                    success: false,
                    message: "Login failed, invalid username/password"
                };
            });
        }
        else {
            this.status = {
                success: false,
                message: "Invalid form data"
            };
        }
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/components/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            src_app_services_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/components/not-found/not-found.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/not-found/not-found.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/not-found/not-found.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/not-found/not-found.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>Not found</h2>\n<p>\n    The page you have reqeusted not found.\n    <a [routerLink]=\"['/']\">Click here</a> to go to login.\n</p>"

/***/ }),

/***/ "./src/app/components/not-found/not-found.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/not-found/not-found.component.ts ***!
  \*************************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'not-found',
            template: __webpack_require__(/*! ./not-found.component.html */ "./src/app/components/not-found/not-found.component.html"),
            styles: [__webpack_require__(/*! ./not-found.component.css */ "./src/app/components/not-found/not-found.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/components/register/register.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/register/register.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n        <div class=\"alert alert-success\" *ngIf=\"status && status.success\">\n            {{status.message}}\n        </div>\n        <div class=\"alert alert-danger\" *ngIf=\"status && status.success===false\">\n            {{status.message}}\n        </div>\n        <h3>Register</h3>\n        <form class=\"form\" [formGroup]=\"form\" (submit)=\"submit()\">\n            <div class=\"form-group\">\n                <label class=\"control-label\" for=\"firstName\">First name</label>\n                <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" />\n                <div *ngIf=\"controls.firstName.invalid && (controls.firstName.dirty || controls.firstName.touched)\" class=\"text-danger\">\n                    <div *ngIf=\"controls.firstName.errors.required\">First name is required. </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\" for=\"lastName\">Last name</label>\n                <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" />\n                <div *ngIf=\"controls.lastName.invalid && (controls.lastName.dirty || controls.lastName.touched)\" class=\"text-danger\">\n                    <div *ngIf=\"controls.lastName.errors.required\">Last name is required. </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\" for=\"email\">Email</label>\n                <input type=\"email\" class=\"form-control\" formControlName=\"email\" />\n                <div *ngIf=\"controls.email.invalid && (controls.email.dirty || controls.email.touched)\" class=\"text-danger\">\n                    <div *ngIf=\"controls.email.errors.required\">Email is required. </div>\n                    <div *ngIf=\"controls.email.errors.email\">Invalid email value </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\" for=\"email\">Password</label>\n                <input type=\"password\" class=\"form-control\" formControlName=\"password\" />\n                <div *ngIf=\"controls.password.invalid && (controls.password.dirty || controls.password.touched)\" class=\"text-danger\">\n                    <div *ngIf=\"controls.password.errors.required\">Password is required. </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\" for=\"contactNo\">Contact No</label>\n                <input type=\"text\" class=\"form-control\" formControlName=\"contactNo\" />\n                <div *ngIf=\"controls.contactNo.invalid && (controls.contactNo.dirty || controls.contactNo.touched)\" class=\"text-danger\">\n                    <div *ngIf=\"controls.contactNo.errors.required\">Contact number is required. </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-success\">Register</button>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/components/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/auth.service */ "./src/app/services/auth.service.ts");




var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, authSvc) {
        this.fb = fb;
        this.authSvc = authSvc;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            "firstName": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,],
            "lastName": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            "email": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email])],
            "password": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            "contactNo": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "controls", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.submit = function () {
        var _this = this;
        if (this.form.valid) {
            this.authSvc.register(this.form.value)
                .subscribe(function (result) {
                _this.status = { success: true, message: "You have registered successfully" };
            }, function (err) {
                _this.status = {
                    success: false,
                    message: "Registration process failed, some error occured"
                };
            });
        }
        else {
            this.status = { success: false, message: "Invalid user details." };
        }
    };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/components/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/components/register/register.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/interceptors/auth-intercepter.ts":
/*!**************************************************!*\
  !*** ./src/app/interceptors/auth-intercepter.ts ***!
  \**************************************************/
/*! exports provided: AuthIntercepter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthIntercepter", function() { return AuthIntercepter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AuthIntercepter = /** @class */ (function () {
    function AuthIntercepter() {
    }
    AuthIntercepter.prototype.intercept = function (req, next) {
        var newReq = req.clone({
            setHeaders: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        var token = localStorage.getItem("auth-token") || undefined;
        if (token) {
            var request = newReq.clone({
                setHeaders: { "Authorization": "Bearer " + token },
            });
            return next.handle(request);
        }
        return next.handle(newReq);
    };
    AuthIntercepter = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], AuthIntercepter);
    return AuthIntercepter;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _configuration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./configuration.service */ "./src/app/services/configuration.service.ts");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storage.service */ "./src/app/services/storage.service.ts");






var AuthService = /** @class */ (function () {
    function AuthService(configSvc, http, storageSvc) {
        var _this = this;
        this.configSvc = configSvc;
        this.http = http;
        this.storageSvc = storageSvc;
        this.loggedIn = false;
        this.APIURL = this.configSvc.configuration.identityApiUrl;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.loggedIn);
        if (this.storageSvc.getItem('auth-token')) {
            this.loggedIn = true;
            this.subject.next(this.loggedIn);
        }
        this.storageSvc.watchStorage()
            .subscribe(function (data) {
            if (data === 'removed')
                _this.loggedIn = false;
            else if (data === 'added')
                _this.loggedIn = true;
            _this.subject.next(_this.loggedIn);
        });
    }
    AuthService.prototype.getToken = function (login) {
        return this.http.post(this.APIURL + "/api/identity/token", login, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });
    };
    AuthService.prototype.register = function (user) {
        return this.http.post(this.APIURL + "/api/identity/register", user, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.subject;
        //return of (this.loggedIn);        
    };
    AuthService.prototype.logOut = function () {
        this.storageSvc.removeItem("auth-token");
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_configuration_service__WEBPACK_IMPORTED_MODULE_4__["ConfigurationService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/configuration.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/configuration.service.ts ***!
  \***************************************************/
/*! exports provided: ConfigurationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationService", function() { return ConfigurationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(http) {
        this.http = http;
    }
    ConfigurationService.prototype.loadSettings = function () {
        var _this = this;
        var baseURI = document.baseURI.endsWith('/') ? document.baseURI : document.baseURI + "/";
        var url = baseURI + "api/settings";
        return this.http.get(url)
            .toPromise()
            .then(function (resp) { return _this.configuration = resp; });
    };
    ConfigurationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ConfigurationService);
    return ConfigurationService;
}());



/***/ }),

/***/ "./src/app/services/event.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/event.service.ts ***!
  \*******************************************/
/*! exports provided: EventService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventService", function() { return EventService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _configuration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration.service */ "./src/app/services/configuration.service.ts");




var EventService = /** @class */ (function () {
    function EventService(http, configSvc) {
        this.http = http;
        this.configSvc = configSvc;
        this.APIURL = this.configSvc.configuration.eventApiUrl;
    }
    EventService.prototype.getEvents = function () {
        return this.http.get(this.APIURL + "/api/events");
    };
    EventService.prototype.addEvent = function (event) {
        return this.http.post(this.APIURL + "/api/events", event, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });
    };
    EventService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _configuration_service__WEBPACK_IMPORTED_MODULE_3__["ConfigurationService"]])
    ], EventService);
    return EventService;
}());



/***/ }),

/***/ "./src/app/services/storage.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/storage.service.ts ***!
  \*********************************************/
/*! exports provided: StorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageService", function() { return StorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var StorageService = /** @class */ (function () {
    function StorageService() {
        this.storageSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    StorageService.prototype.setItem = function (key, value) {
        localStorage.setItem(key, value);
        this.storageSubject.next('added');
    };
    StorageService.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    StorageService.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
        this.storageSubject.next('removed');
    };
    StorageService.prototype.watchStorage = function () {
        return this.storageSubject.asObservable();
    };
    StorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], StorageService);
    return StorageService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\K8S-Microservices\EventClient\EventClient\Client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map