/**
* Copyright 2019 IBM Corp. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import './page.scss';
import './page.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// This is used in the customAtForm template to determine whether or not 
// to show the email/password login formj:w
Template.atForm.helpers({
    showPwdForm() {
        return Meteor.settings.public.LOGIN_TYPE === 'local';
    },
});

// This is used in the customAtOauth template 
Template.atOauth.helpers({
    // only show one login button at a time -- either Github or GitHub enterprise 
    // depending Meteor.settings.public.LOGIN_TYPE
    showService(service, authType) {
        if(service._id === authType) {
            return service;
        }
    },
});

Template.Login.events({
    'click #at-ghe'(event) {
        event.preventDefault();
        if (!Meteor.user()) {
            Meteor.loginWithGhe({ requestPermissions: ['read:user', 'read:org'] }, function() {
                Meteor.call('reloadUserOrgList', ()=> {
                    FlowRouter.go('welcome');
                });
            });
        } else {
            Meteor.logout(function() {
                FlowRouter.go('/login');
            });
        }
    }
});
