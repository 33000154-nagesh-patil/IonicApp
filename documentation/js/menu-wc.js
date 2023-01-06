'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">rsm documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' : 'data-target="#xs-components-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' :
                                            'id="xs-components-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' : 'data-target="#xs-injectables-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' :
                                        'id="xs-injectables-links-module-AppModule-314d5f535b2e4147e96b88d4847c9b0a4ea52747ee1dc3ce02022431f6e0cc3e8df7e1859f5c495987fc4843c2af0f02b35c16758bb7d25fd88f95939196687e"' }>
                                        <li class="link">
                                            <a href="injectables/GlobalHttpInterceptorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GlobalHttpInterceptorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NetworkService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NetworkService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContainerViewPageModule.html" data-type="entity-link" >ContainerViewPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContainerViewPageModule-e73d54f705d24ac4c86114b46a69043c2ddcf571b8fa54f85ebf0e7f273193caabacee153c49a980cf00f52d1de45ced138cdb1a99fa2073179f6a50f5ce4c7f"' : 'data-target="#xs-components-links-module-ContainerViewPageModule-e73d54f705d24ac4c86114b46a69043c2ddcf571b8fa54f85ebf0e7f273193caabacee153c49a980cf00f52d1de45ced138cdb1a99fa2073179f6a50f5ce4c7f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContainerViewPageModule-e73d54f705d24ac4c86114b46a69043c2ddcf571b8fa54f85ebf0e7f273193caabacee153c49a980cf00f52d1de45ced138cdb1a99fa2073179f6a50f5ce4c7f"' :
                                            'id="xs-components-links-module-ContainerViewPageModule-e73d54f705d24ac4c86114b46a69043c2ddcf571b8fa54f85ebf0e7f273193caabacee153c49a980cf00f52d1de45ced138cdb1a99fa2073179f6a50f5ce4c7f"' }>
                                            <li class="link">
                                                <a href="components/ContainerViewPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContainerViewPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContainerViewPageRoutingModule.html" data-type="entity-link" >ContainerViewPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-a84acb422c74f8bdbb8a67057133913768bd2d27b97fa9a4ffba80d07a5a5254b984dec361f72488276fbb3383a2cd0ac60d270f6a7b58339d1eded73c123dd6"' : 'data-target="#xs-components-links-module-CoreModule-a84acb422c74f8bdbb8a67057133913768bd2d27b97fa9a4ffba80d07a5a5254b984dec361f72488276fbb3383a2cd0ac60d270f6a7b58339d1eded73c123dd6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-a84acb422c74f8bdbb8a67057133913768bd2d27b97fa9a4ffba80d07a5a5254b984dec361f72488276fbb3383a2cd0ac60d270f6a7b58339d1eded73c123dd6"' :
                                            'id="xs-components-links-module-CoreModule-a84acb422c74f8bdbb8a67057133913768bd2d27b97fa9a4ffba80d07a5a5254b984dec361f72488276fbb3383a2cd0ac60d270f6a7b58339d1eded73c123dd6"' }>
                                            <li class="link">
                                                <a href="components/AadharOnboardKycComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AadharOnboardKycComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BankDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DigiLockerAadharComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DigiLockerAadharComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EsignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EsignComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExchangeSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExchangeSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FabButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FabButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IncomeProofComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IncomeProofComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvestSIPComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvestSIPComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManuallySignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManuallySignComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NameAddressDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NameAddressDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NomineeDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NomineeDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NsdlComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NsdlComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PanCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PanCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewImageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviewImageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelfieVerificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelfieVerificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignatureUploadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignatureUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadAadharPanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadAadharPanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerificationCodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerificationCodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WebCamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WebCamComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/currencyCommasModule.html" data-type="entity-link" >currencyCommasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-currencyCommasModule-bbef1ee422d0c0ea9af844f5dc807469faa868db7e98741bc443103acc6c2625d80521662ee83d98b3cebf3552f89a4ff69ecc2be07ab0278118bae57dcddcee"' : 'data-target="#xs-pipes-links-module-currencyCommasModule-bbef1ee422d0c0ea9af844f5dc807469faa868db7e98741bc443103acc6c2625d80521662ee83d98b3cebf3552f89a4ff69ecc2be07ab0278118bae57dcddcee"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-currencyCommasModule-bbef1ee422d0c0ea9af844f5dc807469faa868db7e98741bc443103acc6c2625d80521662ee83d98b3cebf3552f89a4ff69ecc2be07ab0278118bae57dcddcee"' :
                                            'id="xs-pipes-links-module-currencyCommasModule-bbef1ee422d0c0ea9af844f5dc807469faa868db7e98741bc443103acc6c2625d80521662ee83d98b3cebf3552f89a4ff69ecc2be07ab0278118bae57dcddcee"' }>
                                            <li class="link">
                                                <a href="pipes/CurrencyCommasHundredsPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrencyCommasHundredsPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardPageModule.html" data-type="entity-link" >DashboardPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardPageModule-dfd4a8fdee8d93ca0be9e28daff583611a248dfd0c1b8421fa7e2586d577ab4dccb6a81afa53ef3c790c44b8c729b671ec5e51cd4f8a45ec9978f2ba8a258343"' : 'data-target="#xs-components-links-module-DashboardPageModule-dfd4a8fdee8d93ca0be9e28daff583611a248dfd0c1b8421fa7e2586d577ab4dccb6a81afa53ef3c790c44b8c729b671ec5e51cd4f8a45ec9978f2ba8a258343"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardPageModule-dfd4a8fdee8d93ca0be9e28daff583611a248dfd0c1b8421fa7e2586d577ab4dccb6a81afa53ef3c790c44b8c729b671ec5e51cd4f8a45ec9978f2ba8a258343"' :
                                            'id="xs-components-links-module-DashboardPageModule-dfd4a8fdee8d93ca0be9e28daff583611a248dfd0c1b8421fa7e2586d577ab4dccb6a81afa53ef3c790c44b8c729b671ec5e51cd4f8a45ec9978f2ba8a258343"' }>
                                            <li class="link">
                                                <a href="components/DashboardPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardPageRoutingModule.html" data-type="entity-link" >DashboardPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EducationModule.html" data-type="entity-link" >EducationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EducationModule-a7cbb77d2894b6256ba1068f69a8d5a02c0c215b3c8d861d12c86eee5b2c07fb43dd5a062e6d86fee2d14e55e6843ab4c716e709d30af7b67e87fabe65247a42"' : 'data-target="#xs-components-links-module-EducationModule-a7cbb77d2894b6256ba1068f69a8d5a02c0c215b3c8d861d12c86eee5b2c07fb43dd5a062e6d86fee2d14e55e6843ab4c716e709d30af7b67e87fabe65247a42"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EducationModule-a7cbb77d2894b6256ba1068f69a8d5a02c0c215b3c8d861d12c86eee5b2c07fb43dd5a062e6d86fee2d14e55e6843ab4c716e709d30af7b67e87fabe65247a42"' :
                                            'id="xs-components-links-module-EducationModule-a7cbb77d2894b6256ba1068f69a8d5a02c0c215b3c8d861d12c86eee5b2c07fb43dd5a062e6d86fee2d14e55e6843ab4c716e709d30af7b67e87fabe65247a42"' }>
                                            <li class="link">
                                                <a href="components/EducationCategoryDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EducationCategoryDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EducationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EducationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EducationPageModule.html" data-type="entity-link" >EducationPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EducationPageModule-5d7e0c6ea79ab27803922a3765235fb46b8914a36d544e0a737d6df6e75529a51f8ebe8c71b4d386a5df8299aa915a976e0e557d68808e14acafc3fae6c2ba17"' : 'data-target="#xs-components-links-module-EducationPageModule-5d7e0c6ea79ab27803922a3765235fb46b8914a36d544e0a737d6df6e75529a51f8ebe8c71b4d386a5df8299aa915a976e0e557d68808e14acafc3fae6c2ba17"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EducationPageModule-5d7e0c6ea79ab27803922a3765235fb46b8914a36d544e0a737d6df6e75529a51f8ebe8c71b4d386a5df8299aa915a976e0e557d68808e14acafc3fae6c2ba17"' :
                                            'id="xs-components-links-module-EducationPageModule-5d7e0c6ea79ab27803922a3765235fb46b8914a36d544e0a737d6df6e75529a51f8ebe8c71b4d386a5df8299aa915a976e0e557d68808e14acafc3fae6c2ba17"' }>
                                            <li class="link">
                                                <a href="components/EducationPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EducationPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EducationPageRoutingModule.html" data-type="entity-link" >EducationPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GoldInvestmentDetailsModule.html" data-type="entity-link" >GoldInvestmentDetailsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GoldInvestmentDetailsModule-6e9e2a15a867a89fb7452ebf810ed0a5c8fe21019405b68f3b4061580b6b7165edbc934aaa55ad8755ab0ea83ae1996fb62e959e3c297a83a2c82a1bdae8a114"' : 'data-target="#xs-components-links-module-GoldInvestmentDetailsModule-6e9e2a15a867a89fb7452ebf810ed0a5c8fe21019405b68f3b4061580b6b7165edbc934aaa55ad8755ab0ea83ae1996fb62e959e3c297a83a2c82a1bdae8a114"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GoldInvestmentDetailsModule-6e9e2a15a867a89fb7452ebf810ed0a5c8fe21019405b68f3b4061580b6b7165edbc934aaa55ad8755ab0ea83ae1996fb62e959e3c297a83a2c82a1bdae8a114"' :
                                            'id="xs-components-links-module-GoldInvestmentDetailsModule-6e9e2a15a867a89fb7452ebf810ed0a5c8fe21019405b68f3b4061580b6b7165edbc934aaa55ad8755ab0ea83ae1996fb62e959e3c297a83a2c82a1bdae8a114"' }>
                                            <li class="link">
                                                <a href="components/BuySellComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuySellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GoldInvestmentDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoldInvestmentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvestmentDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvestmentDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvestmentDetailsTransactionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvestmentDetailsTransactionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KycGoldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KycGoldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrdersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentConfirmationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentConfirmationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoldInvestmentDetailsPageModule.html" data-type="entity-link" >GoldInvestmentDetailsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GoldInvestmentDetailsPageModule-7c867717b224c2ca39be1e0b82b1a14632b3441c5b30be56fbd887767bc7e606ea60063d2375c9e735ebbdced1fc1864bf9afff2368c7f61912f2f51641d4422"' : 'data-target="#xs-components-links-module-GoldInvestmentDetailsPageModule-7c867717b224c2ca39be1e0b82b1a14632b3441c5b30be56fbd887767bc7e606ea60063d2375c9e735ebbdced1fc1864bf9afff2368c7f61912f2f51641d4422"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GoldInvestmentDetailsPageModule-7c867717b224c2ca39be1e0b82b1a14632b3441c5b30be56fbd887767bc7e606ea60063d2375c9e735ebbdced1fc1864bf9afff2368c7f61912f2f51641d4422"' :
                                            'id="xs-components-links-module-GoldInvestmentDetailsPageModule-7c867717b224c2ca39be1e0b82b1a14632b3441c5b30be56fbd887767bc7e606ea60063d2375c9e735ebbdced1fc1864bf9afff2368c7f61912f2f51641d4422"' }>
                                            <li class="link">
                                                <a href="components/GoldInvestmentDetailsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoldInvestmentDetailsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoldInvestmentDetailsPageRoutingModule.html" data-type="entity-link" >GoldInvestmentDetailsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GoldModule.html" data-type="entity-link" >GoldModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GoldModule-ae101d2addf85dbca7a37537b2b6c7030c98cae8dcfd798351dda991116949cf120c51c356159ba8455647776dcf85d43e3ce0ea5aa8fae93f9d43c2ed7b66c5"' : 'data-target="#xs-components-links-module-GoldModule-ae101d2addf85dbca7a37537b2b6c7030c98cae8dcfd798351dda991116949cf120c51c356159ba8455647776dcf85d43e3ce0ea5aa8fae93f9d43c2ed7b66c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GoldModule-ae101d2addf85dbca7a37537b2b6c7030c98cae8dcfd798351dda991116949cf120c51c356159ba8455647776dcf85d43e3ce0ea5aa8fae93f9d43c2ed7b66c5"' :
                                            'id="xs-components-links-module-GoldModule-ae101d2addf85dbca7a37537b2b6c7030c98cae8dcfd798351dda991116949cf120c51c356159ba8455647776dcf85d43e3ce0ea5aa8fae93f9d43c2ed7b66c5"' }>
                                            <li class="link">
                                                <a href="components/GoldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GoldDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoldDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GoldInvestmentDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoldInvestmentDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoldPageModule.html" data-type="entity-link" >GoldPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GoldPageModule-7e39563c5080c634955bd5759d61d0e3e75cb66236db099c7a22d334cef5fff283bfcc47e35efff01f15965842764e25f13c9d37646f60931a9b0bea5c869c27"' : 'data-target="#xs-components-links-module-GoldPageModule-7e39563c5080c634955bd5759d61d0e3e75cb66236db099c7a22d334cef5fff283bfcc47e35efff01f15965842764e25f13c9d37646f60931a9b0bea5c869c27"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GoldPageModule-7e39563c5080c634955bd5759d61d0e3e75cb66236db099c7a22d334cef5fff283bfcc47e35efff01f15965842764e25f13c9d37646f60931a9b0bea5c869c27"' :
                                            'id="xs-components-links-module-GoldPageModule-7e39563c5080c634955bd5759d61d0e3e75cb66236db099c7a22d334cef5fff283bfcc47e35efff01f15965842764e25f13c9d37646f60931a9b0bea5c869c27"' }>
                                            <li class="link">
                                                <a href="components/GoldPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoldPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoldPageRoutingModule.html" data-type="entity-link" >GoldPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HealthModule-5e07347af0ec54ff717efc3879330f0a09d2345725e8b313dc37a361d18b8b66230a87a215edbbe810ee88af08924f4cb06847cd2c7107c0152ca6bb5394406c"' : 'data-target="#xs-components-links-module-HealthModule-5e07347af0ec54ff717efc3879330f0a09d2345725e8b313dc37a361d18b8b66230a87a215edbbe810ee88af08924f4cb06847cd2c7107c0152ca6bb5394406c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HealthModule-5e07347af0ec54ff717efc3879330f0a09d2345725e8b313dc37a361d18b8b66230a87a215edbbe810ee88af08924f4cb06847cd2c7107c0152ca6bb5394406c"' :
                                            'id="xs-components-links-module-HealthModule-5e07347af0ec54ff717efc3879330f0a09d2345725e8b313dc37a361d18b8b66230a87a215edbbe810ee88af08924f4cb06847cd2c7107c0152ca6bb5394406c"' }>
                                            <li class="link">
                                                <a href="components/HealthCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HealthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthPageModule.html" data-type="entity-link" >HealthPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HealthPageModule-b15bdd77f150289cbeb7da8f28222a29f5236576114f7bb8cc7d7e3758eb709f1679c78997159df224fb27f238819ca43c6040d406549888ec70cd377a25c0c2"' : 'data-target="#xs-components-links-module-HealthPageModule-b15bdd77f150289cbeb7da8f28222a29f5236576114f7bb8cc7d7e3758eb709f1679c78997159df224fb27f238819ca43c6040d406549888ec70cd377a25c0c2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HealthPageModule-b15bdd77f150289cbeb7da8f28222a29f5236576114f7bb8cc7d7e3758eb709f1679c78997159df224fb27f238819ca43c6040d406549888ec70cd377a25c0c2"' :
                                            'id="xs-components-links-module-HealthPageModule-b15bdd77f150289cbeb7da8f28222a29f5236576114f7bb8cc7d7e3758eb709f1679c78997159df224fb27f238819ca43c6040d406549888ec70cd377a25c0c2"' }>
                                            <li class="link">
                                                <a href="components/HealthPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthPageRoutingModule.html" data-type="entity-link" >HealthPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IntroModule.html" data-type="entity-link" >IntroModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IntroModule-37e7906a3bb1386da79b773d29e51b2d32930a3976855edd3d5d31cb0d8f61df4c4d826351fbe43943f556a9065e15811e7b29a89be6ec0241da690ba457ca87"' : 'data-target="#xs-components-links-module-IntroModule-37e7906a3bb1386da79b773d29e51b2d32930a3976855edd3d5d31cb0d8f61df4c4d826351fbe43943f556a9065e15811e7b29a89be6ec0241da690ba457ca87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IntroModule-37e7906a3bb1386da79b773d29e51b2d32930a3976855edd3d5d31cb0d8f61df4c4d826351fbe43943f556a9065e15811e7b29a89be6ec0241da690ba457ca87"' :
                                            'id="xs-components-links-module-IntroModule-37e7906a3bb1386da79b773d29e51b2d32930a3976855edd3d5d31cb0d8f61df4c4d826351fbe43943f556a9065e15811e7b29a89be6ec0241da690ba457ca87"' }>
                                            <li class="link">
                                                <a href="components/InformationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IntroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IntroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SplashScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SplashScreenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LibConfigModule.html" data-type="entity-link" >LibConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LifestyleModule.html" data-type="entity-link" >LifestyleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LifestyleModule-cf369f1b13cbea4e68cd947a8af831f8f579f16e7494309945b9a64a56e20359c40bd02d253682ae167287bb36e62205b15386c3706010d16be17198e6b70b33"' : 'data-target="#xs-components-links-module-LifestyleModule-cf369f1b13cbea4e68cd947a8af831f8f579f16e7494309945b9a64a56e20359c40bd02d253682ae167287bb36e62205b15386c3706010d16be17198e6b70b33"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LifestyleModule-cf369f1b13cbea4e68cd947a8af831f8f579f16e7494309945b9a64a56e20359c40bd02d253682ae167287bb36e62205b15386c3706010d16be17198e6b70b33"' :
                                            'id="xs-components-links-module-LifestyleModule-cf369f1b13cbea4e68cd947a8af831f8f579f16e7494309945b9a64a56e20359c40bd02d253682ae167287bb36e62205b15386c3706010d16be17198e6b70b33"' }>
                                            <li class="link">
                                                <a href="components/LifestyleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LifestyleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LifestylePageModule.html" data-type="entity-link" >LifestylePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LifestylePageModule-66a5278e50ec987ec0ba5a6cb69325e7c7d68a6bbda47ba81ac969b3f66859de303ff26577e2ef933dafcdb89cae79767a5e4524619dcd0342ef26a6591db29d"' : 'data-target="#xs-components-links-module-LifestylePageModule-66a5278e50ec987ec0ba5a6cb69325e7c7d68a6bbda47ba81ac969b3f66859de303ff26577e2ef933dafcdb89cae79767a5e4524619dcd0342ef26a6591db29d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LifestylePageModule-66a5278e50ec987ec0ba5a6cb69325e7c7d68a6bbda47ba81ac969b3f66859de303ff26577e2ef933dafcdb89cae79767a5e4524619dcd0342ef26a6591db29d"' :
                                            'id="xs-components-links-module-LifestylePageModule-66a5278e50ec987ec0ba5a6cb69325e7c7d68a6bbda47ba81ac969b3f66859de303ff26577e2ef933dafcdb89cae79767a5e4524619dcd0342ef26a6591db29d"' }>
                                            <li class="link">
                                                <a href="components/LifestylePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LifestylePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LifestylePageRoutingModule.html" data-type="entity-link" >LifestylePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginListModule.html" data-type="entity-link" >LoginListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginListModule-5ed31398873f29db8c57744ee3cab546b664da98eeaa5761cb151950ae29490c01390cf52852ce2d2b27a8199fd8fe321b4f91c9037b9ded8c6a645b4cc85763"' : 'data-target="#xs-components-links-module-LoginListModule-5ed31398873f29db8c57744ee3cab546b664da98eeaa5761cb151950ae29490c01390cf52852ce2d2b27a8199fd8fe321b4f91c9037b9ded8c6a645b4cc85763"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginListModule-5ed31398873f29db8c57744ee3cab546b664da98eeaa5761cb151950ae29490c01390cf52852ce2d2b27a8199fd8fe321b4f91c9037b9ded8c6a645b4cc85763"' :
                                            'id="xs-components-links-module-LoginListModule-5ed31398873f29db8c57744ee3cab546b664da98eeaa5761cb151950ae29490c01390cf52852ce2d2b27a8199fd8fe321b4f91c9037b9ded8c6a645b4cc85763"' }>
                                            <li class="link">
                                                <a href="components/LoginAuthenticationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginAuthenticationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-cc690a499f4529206dfe2c8e51ff6a24a1d434bbea85ea1115dc66bb5367f08ab80154d0d5469ad815f927fa3288ce41171c9b22cb6be8a2f36e0df348d6c760"' : 'data-target="#xs-components-links-module-LoginPageModule-cc690a499f4529206dfe2c8e51ff6a24a1d434bbea85ea1115dc66bb5367f08ab80154d0d5469ad815f927fa3288ce41171c9b22cb6be8a2f36e0df348d6c760"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-cc690a499f4529206dfe2c8e51ff6a24a1d434bbea85ea1115dc66bb5367f08ab80154d0d5469ad815f927fa3288ce41171c9b22cb6be8a2f36e0df348d6c760"' :
                                            'id="xs-components-links-module-LoginPageModule-cc690a499f4529206dfe2c8e51ff6a24a1d434bbea85ea1115dc66bb5367f08ab80154d0d5469ad815f927fa3288ce41171c9b22cb6be8a2f36e0df348d6c760"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MutualFundsModule.html" data-type="entity-link" >MutualFundsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MutualFundsModule-18e292d400fc42f06a04ec45c4e9c57be4415ac15ea3c4ae743d56a9710e07ccf6690f2511c570cae922f8536da1a3e18d8618c75ebd3f6fd9da399383b93265"' : 'data-target="#xs-components-links-module-MutualFundsModule-18e292d400fc42f06a04ec45c4e9c57be4415ac15ea3c4ae743d56a9710e07ccf6690f2511c570cae922f8536da1a3e18d8618c75ebd3f6fd9da399383b93265"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MutualFundsModule-18e292d400fc42f06a04ec45c4e9c57be4415ac15ea3c4ae743d56a9710e07ccf6690f2511c570cae922f8536da1a3e18d8618c75ebd3f6fd9da399383b93265"' :
                                            'id="xs-components-links-module-MutualFundsModule-18e292d400fc42f06a04ec45c4e9c57be4415ac15ea3c4ae743d56a9710e07ccf6690f2511c570cae922f8536da1a3e18d8618c75ebd3f6fd9da399383b93265"' }>
                                            <li class="link">
                                                <a href="components/ExploreFundsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExploreFundsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MutualFundsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MutualFundsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StepeerOnbordingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StepeerOnbordingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MutualFundsPageModule.html" data-type="entity-link" >MutualFundsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MutualFundsPageModule-84a62ffa2f7dcc4266320df49341f51d3af350a0f8d4f11007c32237d18de41b848844de5b94e5b1ebafcd0e420ee88c18ece0f28226ea7ed6b658e3d369971b"' : 'data-target="#xs-components-links-module-MutualFundsPageModule-84a62ffa2f7dcc4266320df49341f51d3af350a0f8d4f11007c32237d18de41b848844de5b94e5b1ebafcd0e420ee88c18ece0f28226ea7ed6b658e3d369971b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MutualFundsPageModule-84a62ffa2f7dcc4266320df49341f51d3af350a0f8d4f11007c32237d18de41b848844de5b94e5b1ebafcd0e420ee88c18ece0f28226ea7ed6b658e3d369971b"' :
                                            'id="xs-components-links-module-MutualFundsPageModule-84a62ffa2f7dcc4266320df49341f51d3af350a0f8d4f11007c32237d18de41b848844de5b94e5b1ebafcd0e420ee88c18ece0f28226ea7ed6b658e3d369971b"' }>
                                            <li class="link">
                                                <a href="components/MutualFundsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MutualFundsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MutualFundsPageRoutingModule.html" data-type="entity-link" >MutualFundsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PanadharModule.html" data-type="entity-link" >PanadharModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PanadharModule-3a365d0050dfa8bf2382298d424c747494900ffeaa111da8cb06f47bda772abf542c75c4c61908eb34fdfc069242b537635ed78e87b20f5a05a0c8044ded1e39"' : 'data-target="#xs-components-links-module-PanadharModule-3a365d0050dfa8bf2382298d424c747494900ffeaa111da8cb06f47bda772abf542c75c4c61908eb34fdfc069242b537635ed78e87b20f5a05a0c8044ded1e39"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanadharModule-3a365d0050dfa8bf2382298d424c747494900ffeaa111da8cb06f47bda772abf542c75c4c61908eb34fdfc069242b537635ed78e87b20f5a05a0c8044ded1e39"' :
                                            'id="xs-components-links-module-PanadharModule-3a365d0050dfa8bf2382298d424c747494900ffeaa111da8cb06f47bda772abf542c75c4c61908eb34fdfc069242b537635ed78e87b20f5a05a0c8044ded1e39"' }>
                                            <li class="link">
                                                <a href="components/PanadharComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PanadharComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PortfolioInsigthsModule.html" data-type="entity-link" >PortfolioInsigthsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PortfolioInsigthsModule-c6004a5763a52dfce2985bf93363f886712dffac2c90dc7743e6e27b80cda24eabd2cbf58e6d24ed69f7d34661e218ede436b2c3b586df7b6cb6a6dbf67e6e01"' : 'data-target="#xs-components-links-module-PortfolioInsigthsModule-c6004a5763a52dfce2985bf93363f886712dffac2c90dc7743e6e27b80cda24eabd2cbf58e6d24ed69f7d34661e218ede436b2c3b586df7b6cb6a6dbf67e6e01"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PortfolioInsigthsModule-c6004a5763a52dfce2985bf93363f886712dffac2c90dc7743e6e27b80cda24eabd2cbf58e6d24ed69f7d34661e218ede436b2c3b586df7b6cb6a6dbf67e6e01"' :
                                            'id="xs-components-links-module-PortfolioInsigthsModule-c6004a5763a52dfce2985bf93363f886712dffac2c90dc7743e6e27b80cda24eabd2cbf58e6d24ed69f7d34661e218ede436b2c3b586df7b6cb6a6dbf67e6e01"' }>
                                            <li class="link">
                                                <a href="components/PortfolioInsigthsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PortfolioInsigthsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductDetailsModule.html" data-type="entity-link" >ProductDetailsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductDetailsModule-2a3e70cf2eaef9b491fc498cdf670dfedcbad9a2203f9be11b41eee6bc27097e4090f903115e84071008302af66366eacc3c6064bbf51661b8e90f769f75fc35"' : 'data-target="#xs-components-links-module-ProductDetailsModule-2a3e70cf2eaef9b491fc498cdf670dfedcbad9a2203f9be11b41eee6bc27097e4090f903115e84071008302af66366eacc3c6064bbf51661b8e90f769f75fc35"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductDetailsModule-2a3e70cf2eaef9b491fc498cdf670dfedcbad9a2203f9be11b41eee6bc27097e4090f903115e84071008302af66366eacc3c6064bbf51661b8e90f769f75fc35"' :
                                            'id="xs-components-links-module-ProductDetailsModule-2a3e70cf2eaef9b491fc498cdf670dfedcbad9a2203f9be11b41eee6bc27097e4090f903115e84071008302af66366eacc3c6064bbf51661b8e90f769f75fc35"' }>
                                            <li class="link">
                                                <a href="components/KycStepsMFComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KycStepsMFComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductDetailsPageModule.html" data-type="entity-link" >ProductDetailsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductDetailsPageModule-cb633ad682ad96e7f0a7705c9ee155e1e4002c207562339718150b608c2409087aed0d42e8d27e7bd4f8793bc76ba7a50e9bae077c6b6b8bd50b92320f2a24c2"' : 'data-target="#xs-components-links-module-ProductDetailsPageModule-cb633ad682ad96e7f0a7705c9ee155e1e4002c207562339718150b608c2409087aed0d42e8d27e7bd4f8793bc76ba7a50e9bae077c6b6b8bd50b92320f2a24c2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductDetailsPageModule-cb633ad682ad96e7f0a7705c9ee155e1e4002c207562339718150b608c2409087aed0d42e8d27e7bd4f8793bc76ba7a50e9bae077c6b6b8bd50b92320f2a24c2"' :
                                            'id="xs-components-links-module-ProductDetailsPageModule-cb633ad682ad96e7f0a7705c9ee155e1e4002c207562339718150b608c2409087aed0d42e8d27e7bd4f8793bc76ba7a50e9bae077c6b6b8bd50b92320f2a24c2"' }>
                                            <li class="link">
                                                <a href="components/ProductDetailsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductDetailsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductDetailsPageRoutingModule.html" data-type="entity-link" >ProductDetailsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StocksModule.html" data-type="entity-link" >StocksModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StocksPageModule.html" data-type="entity-link" >StocksPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StocksPageModule-ef71ce34e0bb2bb06dcebef8ea9a5d9bb82d80c5b456a40fe48da87473bc70fdbf4ece490e13cb79297c592796aa3306ae9dc98838ed1a74e2f06dcd7f72645a"' : 'data-target="#xs-components-links-module-StocksPageModule-ef71ce34e0bb2bb06dcebef8ea9a5d9bb82d80c5b456a40fe48da87473bc70fdbf4ece490e13cb79297c592796aa3306ae9dc98838ed1a74e2f06dcd7f72645a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StocksPageModule-ef71ce34e0bb2bb06dcebef8ea9a5d9bb82d80c5b456a40fe48da87473bc70fdbf4ece490e13cb79297c592796aa3306ae9dc98838ed1a74e2f06dcd7f72645a"' :
                                            'id="xs-components-links-module-StocksPageModule-ef71ce34e0bb2bb06dcebef8ea9a5d9bb82d80c5b456a40fe48da87473bc70fdbf4ece490e13cb79297c592796aa3306ae9dc98838ed1a74e2f06dcd7f72645a"' }>
                                            <li class="link">
                                                <a href="components/StocksPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StocksPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StocksPageRoutingModule.html" data-type="entity-link" >StocksPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SubmenuModule.html" data-type="entity-link" >SubmenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SubmenuModule-09fefe5ed87dbe7e390acbd0b7f476641800c1fb841d99768aa449712cf0b67476843f3f5fe826f1a7fa2e5657e249526de6272bfce9286ff294ff414c8a1859"' : 'data-target="#xs-components-links-module-SubmenuModule-09fefe5ed87dbe7e390acbd0b7f476641800c1fb841d99768aa449712cf0b67476843f3f5fe826f1a7fa2e5657e249526de6272bfce9286ff294ff414c8a1859"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SubmenuModule-09fefe5ed87dbe7e390acbd0b7f476641800c1fb841d99768aa449712cf0b67476843f3f5fe826f1a7fa2e5657e249526de6272bfce9286ff294ff414c8a1859"' :
                                            'id="xs-components-links-module-SubmenuModule-09fefe5ed87dbe7e390acbd0b7f476641800c1fb841d99768aa449712cf0b67476843f3f5fe826f1a7fa2e5657e249526de6272bfce9286ff294ff414c8a1859"' }>
                                            <li class="link">
                                                <a href="components/SubmenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TranslateModule.html" data-type="entity-link" >TranslateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-TranslateModule-c50d05b331015fc4560ae7f9bf75bbe5513c49158a52eb0bf365c9e226315142008a69f95d72b65ae748ae40d9c4c1b98ee916c14e4603d524db59a135e8e3f2"' : 'data-target="#xs-pipes-links-module-TranslateModule-c50d05b331015fc4560ae7f9bf75bbe5513c49158a52eb0bf365c9e226315142008a69f95d72b65ae748ae40d9c4c1b98ee916c14e4603d524db59a135e8e3f2"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TranslateModule-c50d05b331015fc4560ae7f9bf75bbe5513c49158a52eb0bf365c9e226315142008a69f95d72b65ae748ae40d9c4c1b98ee916c14e4603d524db59a135e8e3f2"' :
                                            'id="xs-pipes-links-module-TranslateModule-c50d05b331015fc4560ae7f9bf75bbe5513c49158a52eb0bf365c9e226315142008a69f95d72b65ae748ae40d9c4c1b98ee916c14e4603d524db59a135e8e3f2"' }>
                                            <li class="link">
                                                <a href="pipes/TranslatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TranslatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WealthRoboAdvisoryModule.html" data-type="entity-link" >WealthRoboAdvisoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WealthRoboAdvisoryModule-6ee7a90336a044f911d6ba5c4cab0d1b59fb31c0105f6cbd3453b3bd147b292b7f4b4ad22574afcb4916ce528939ca90fc4f822574b94ac7753a7375eb820a24"' : 'data-target="#xs-components-links-module-WealthRoboAdvisoryModule-6ee7a90336a044f911d6ba5c4cab0d1b59fb31c0105f6cbd3453b3bd147b292b7f4b4ad22574afcb4916ce528939ca90fc4f822574b94ac7753a7375eb820a24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WealthRoboAdvisoryModule-6ee7a90336a044f911d6ba5c4cab0d1b59fb31c0105f6cbd3453b3bd147b292b7f4b4ad22574afcb4916ce528939ca90fc4f822574b94ac7753a7375eb820a24"' :
                                            'id="xs-components-links-module-WealthRoboAdvisoryModule-6ee7a90336a044f911d6ba5c4cab0d1b59fb31c0105f6cbd3453b3bd147b292b7f4b4ad22574afcb4916ce528939ca90fc4f822574b94ac7753a7375eb820a24"' }>
                                            <li class="link">
                                                <a href="components/InvestmentPlanningComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvestmentPlanningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvestmentPlanningTrackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvestmentPlanningTrackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvestmentPlanningTransactComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvestmentPlanningTransactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlanningRecommendedModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanningRecommendedModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlanningTrackModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanningTrackModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlanningTranslateModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanningTranslateModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WealthRoboAdvisoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WealthRoboAdvisoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WealthRoboAdvisoryPageModule.html" data-type="entity-link" >WealthRoboAdvisoryPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WealthRoboAdvisoryPageModule-98aea5b4237a13f58d7ce021c4fe761b14ba281820b7032c100c54cf908e3b73522a191cd2baae3fa2cc38feb06f5a688ead10a6cbcd016ed09d592ca966eb8c"' : 'data-target="#xs-components-links-module-WealthRoboAdvisoryPageModule-98aea5b4237a13f58d7ce021c4fe761b14ba281820b7032c100c54cf908e3b73522a191cd2baae3fa2cc38feb06f5a688ead10a6cbcd016ed09d592ca966eb8c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WealthRoboAdvisoryPageModule-98aea5b4237a13f58d7ce021c4fe761b14ba281820b7032c100c54cf908e3b73522a191cd2baae3fa2cc38feb06f5a688ead10a6cbcd016ed09d592ca966eb8c"' :
                                            'id="xs-components-links-module-WealthRoboAdvisoryPageModule-98aea5b4237a13f58d7ce021c4fe761b14ba281820b7032c100c54cf908e3b73522a191cd2baae3fa2cc38feb06f5a688ead10a6cbcd016ed09d592ca966eb8c"' }>
                                            <li class="link">
                                                <a href="components/WealthRoboAdvisoryPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WealthRoboAdvisoryPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WealthRoboAdvisoryPageRoutingModule.html" data-type="entity-link" >WealthRoboAdvisoryPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WealthWellnessModule.html" data-type="entity-link" >WealthWellnessModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WealthWellnessModule-2feb5392bc6358e12bbb26c24c4010c45c52114f89de9a235c47ce40b61daeb511f144d7cd0b7485da6ebb6acaafd37f7e2cd5bbfe893e09d04ca8ab58a667e0"' : 'data-target="#xs-components-links-module-WealthWellnessModule-2feb5392bc6358e12bbb26c24c4010c45c52114f89de9a235c47ce40b61daeb511f144d7cd0b7485da6ebb6acaafd37f7e2cd5bbfe893e09d04ca8ab58a667e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WealthWellnessModule-2feb5392bc6358e12bbb26c24c4010c45c52114f89de9a235c47ce40b61daeb511f144d7cd0b7485da6ebb6acaafd37f7e2cd5bbfe893e09d04ca8ab58a667e0"' :
                                            'id="xs-components-links-module-WealthWellnessModule-2feb5392bc6358e12bbb26c24c4010c45c52114f89de9a235c47ce40b61daeb511f144d7cd0b7485da6ebb6acaafd37f7e2cd5bbfe893e09d04ca8ab58a667e0"' }>
                                            <li class="link">
                                                <a href="components/WealthWellnessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WealthWellnessComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CoreComponent.html" data-type="entity-link" >CoreComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StocksComponent.html" data-type="entity-link" >StocksComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link" >AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link" >AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AllConfigDataService.html" data-type="entity-link" >AllConfigDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonFunctionService.html" data-type="entity-link" >CommonFunctionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link" >CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoreService.html" data-type="entity-link" >CoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EducationService.html" data-type="entity-link" >EducationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalHttpInterceptorService.html" data-type="entity-link" >GlobalHttpInterceptorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalServiceInterceptorService.html" data-type="entity-link" >GlobalServiceInterceptorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoldInvestmentDetailsService.html" data-type="entity-link" >GoldInvestmentDetailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoldService.html" data-type="entity-link" >GoldService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthService.html" data-type="entity-link" >HealthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IntroService.html" data-type="entity-link" >IntroService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LibConfigService.html" data-type="entity-link" >LibConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LifestyleService.html" data-type="entity-link" >LifestyleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginListService.html" data-type="entity-link" >LoginListService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MultipleLanguagesService.html" data-type="entity-link" >MultipleLanguagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MutualFundsService.html" data-type="entity-link" >MutualFundsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NetworkService.html" data-type="entity-link" >NetworkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PanadharService.html" data-type="entity-link" >PanadharService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PortfolioInsigthsService.html" data-type="entity-link" >PortfolioInsigthsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductDetailsService.html" data-type="entity-link" >ProductDetailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScriptLoaderService.html" data-type="entity-link" >ScriptLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StocksService.html" data-type="entity-link" >StocksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubmenuService.html" data-type="entity-link" >SubmenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WealthRoboAdvisoryService.html" data-type="entity-link" >WealthRoboAdvisoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WealthWellnessService.html" data-type="entity-link" >WealthWellnessService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/DefaultRouteGuard.html" data-type="entity-link" >DefaultRouteGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IntroGuard.html" data-type="entity-link" >IntroGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/bankDetails.html" data-type="entity-link" >bankDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChequeOcrResponse.html" data-type="entity-link" >ChequeOcrResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/civilKraDetails.html" data-type="entity-link" >civilKraDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/dropdown.html" data-type="entity-link" >dropdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamicComponentManifest.html" data-type="entity-link" >DynamicComponentManifest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExchangeSelectionDataListRe.html" data-type="entity-link" >ExchangeSelectionDataListRe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/master.html" data-type="entity-link" >master</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/nomineeProfileDetail.html" data-type="entity-link" >nomineeProfileDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/offerList.html" data-type="entity-link" >offerList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/otpResponse.html" data-type="entity-link" >otpResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/panDetails.html" data-type="entity-link" >panDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/registrationResponse.html" data-type="entity-link" >registrationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/socialUserDetail.html" data-type="entity-link" >socialUserDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/stepperData.html" data-type="entity-link" >stepperData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userProfileDetail.html" data-type="entity-link" >userProfileDetail</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});