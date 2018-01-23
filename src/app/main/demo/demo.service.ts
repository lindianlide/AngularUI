import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Http } from '@angular/http';
import { LeftMenuService } from '../../shared/dlLib/leftmenu/leftmenu.service';

@Injectable()
export class DemoService {
    MENU:any[];
    constructor(private _router:Router, private http:Http, private _menuService:LeftMenuService) {
    }


    configMenu() {
        //国际化场景
        /* let keys:string[] = ['Overview', 'topo.title', 'publicIp.resource', 'vm.vm', 'CloudDisk', 'router.name'];
         this.translate.get(keys).subscribe((res:any) => {
         this.initMenu(res);
         //angular路由数组，统一格式
         this._menuService.updateMenuByRoutes(<Routes>this.MENU);
         });*/
        this.initMenu();
        //angular路由数组，统一格式
        this._menuService.updateMenuByRoutes(<Routes>this.MENU);
    }

    initMenu() {
        this.MENU = [
        {
            //path1: 'pages',
            data: {
                menu: {
                    title: '组件',
                    icon: "fa fa-circle-o",
                    selected: false,
                    expanded: true,
                    order: 200
                }
            },
            children: [
                {
                    path: '/main/components/button',
                    data: {
                        menu: {
                            title: '按钮',
                            icon: "fa fa-circle-o",
                            selected: true,
                            expanded: false,
                            order: 0
                        }
                    }
                },
                {
                    path: '/main/components/input',
                    data: {
                        menu: {
                            title: '文本框',
                            icon: "fa fa-circle-o",
                            selected: true,
                            expanded: false,
                            order: 0
                        }
                    }
                }
               /* {
                    //path1: 'resource',
                    data: {
                        menu: {
                            title: menuObj['publicIp.resource'],
                            //icon: 'nav_icon_resource',
                            icon: 'font-paletx px-icon-Resources_20',
                            selected: false,
                            expanded: true,
                            hidden: config.resource_ === '2',
                            order: 200
                        }
                    },
                    children: [
                        {
                            path: '/pages/resource/instance',
                            data: {
                                menu: {
                                    title: menuObj['vm.vm'],
                                    hidden: config.resource_instance === '2',
                                    icon: 'nav_icon_server'
                                }
                            }
                        },
                        {
                            path: '/pages/resource/bm',
                            data: {
                                menu: {
                                    title: menuObj['bm.bms'],
                                    hidden: config.resource_baremetal === '2',
                                    icon: 'nav_icon_server'
                                }
                            }
                        }
                    ]
                }*/
            ]
        }
    ];
    }
}
