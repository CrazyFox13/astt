import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: 'public/home', pathMatch: 'full'},

    //Private
    {
        path: 'private/tasks',
        loadChildren: './private/tasks/tasks.module#TasksPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/tasks/detail/:id/:categoryType/:categoryCode/:itemCode',
        loadChildren: './private/tasks/detail/detail.module#DetailPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/tasks/create-offer/:id/:iBlockId/:categoryType/:categoryCode/:taskCode',
        loadChildren: './private/tasks/create-offer/create-offer.module#CreateOfferPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/tasks/responses/:id/:iBlockId',
        loadChildren: './private/tasks/responses/responses.module#ResponsesPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/tasks/responses/:taskId/:iBlockId/:offerId',
        loadChildren: './private/tasks/responses/detail/detail.module#DetailPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/tasks/edit/:id/:categoryType/:categoryCode/:itemCode',
        loadChildren: './private/tasks/edit/edit.module#EditPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/tasks/i-executor',
        loadChildren: './private/tasks/i-executor/i-executor.module#IExecutorPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/tasks/i-executor/detail/:id/:categoryType/:categoryCode/:itemCode',
        loadChildren: './private/tasks/i-executor/detail/detail.module#DetailPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/settings',
        loadChildren: './private/settings/settings.module#SettingsPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/notifications',
        loadChildren: './private/notifications/notifications.module#NotificationsPageModule', canActivate: [AuthGuard]
    },
    {
        path: 'private/messages',
        loadChildren: './private/messages/messages.module#MessagesPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/messages/detail/:roomId/:taskId',
        loadChildren: './private/messages/detail/detail.module#DetailPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/black-list',
        loadChildren: './private/black-list/black-list.module#BlackListPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/balance',
        loadChildren: './private/balance/balance.module#BalancePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/balance/payment/:id',
        loadChildren: './private/balance/payment/payment.module#PaymentPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/portfolio',
        loadChildren: './private/portfolio/portfolio.module#PortfolioPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/portfolio/detail/:id',
        loadChildren: './private/portfolio/detail/detail.module#DetailPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/favourites',
        loadChildren: './private/favourites/favourites.module#FavouritesPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/subscribes',
        loadChildren: './private/subscribes/subscribes.module#SubscribesPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-detail/:id',
        loadChildren: './private/task-detail/task-detail.module#TaskDetailPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-create',
        loadChildren: './private/task-create/task-create.module#TaskCreatePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-create/select-category/:categoryType',
        loadChildren: './private/task-create/select-category/select-category.module#SelectCategoryPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-create/select-city/:categoryType/:categoryId',
        loadChildren: './private/task-create/select-city/select-city.module#SelectCityPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-create/make/:categoryType/:categoryId/:cityId',
        loadChildren: './private/task-create/make/make.module#MakePageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-create/success',
        loadChildren: './private/task-create/success/success.module#SuccessPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-create/moderation',
        loadChildren: './private/task-create/moderation/moderation.module#ModerationPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'private/task-response-add/:id',
        loadChildren: './private/task-response-add/task-response-add.module#TaskResponseAddPageModule',
        canActivate: [AuthGuard]
    },

    //Public
    {path: 'public/home', loadChildren: () => import('./public/home/home.module').then(m => m.HomePageModule)},
    {path: 'public/auth', loadChildren: './public/auth/auth.module#AuthPageModule'},
    {path: 'public/register', loadChildren: './public/register/register.module#RegisterPageModule'},
    {path: 'public/cities', loadChildren: './public/cities/cities.module#CitiesPageModule'},
    {path: 'public/tasks', loadChildren: './public/tasks/tasks.module#TasksPageModule'},
    {
        path: 'public/tasks/:id/:categoryType/:categoryCode/:itemCode',
        loadChildren: './public/tasks/detail/detail.module#DetailPageModule'
    },
    {path: 'public/users', loadChildren: './public/users/users.module#UsersPageModule'},
    {path: 'public/users/detail/:id', loadChildren: './public/users/detail/detail.module#DetailPageModule'},
    {
        path: 'public/users/detail/tasks/created/:userId',
        loadChildren: './public/users/detail/tasks/created/created.module#CreatedPageModule'
    },
    {
        path: 'public/users/detail/tasks/completed/:userId',
        loadChildren: './public/users/detail/tasks/completed/completed.module#CompletedPageModule'
    },
    {
        path: 'public/users/detail/reviews/positive/:userId',
        loadChildren: './public/users/detail/reviews/positive/positive.module#PositivePageModule'
    },
    {
        path: 'public/users/detail/reviews/negative/:userId',
        loadChildren: './public/users/detail/reviews/negative/negative.module#NegativePageModule'
    },
    {
        path: 'public/users/detail/reviews/neutral/:userId',
        loadChildren: './public/users/detail/reviews/neutral/neutral.module#NeutralPageModule'
    },
    {
        path: 'public/users/detail/portfolio/:userId/:categoryId',
        loadChildren: './public/users/detail/portfolio/portfolio.module#PortfolioPageModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
