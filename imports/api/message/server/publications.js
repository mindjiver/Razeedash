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

import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';
import { check } from 'meteor/check';
import { requireOrgAccess } from '/imports/api/org/utils.js';
import moment from 'moment';

Meteor.publish('messages.past5Minutes', function(orgId) {
    requireOrgAccess(orgId);
    return Messages.find({ org_id: orgId, updated: { $gte: new moment().subtract(5, 'minutes').toDate() } }, { limit: 10, sort: { updated: -1 } });
});

Meteor.publish('messages.byCluster', function(clusterId) {
    check( clusterId, String );
    return Messages.find({ cluster_id: clusterId, updated: { $gte: new moment().subtract(1, 'hour').toDate() } }, { limit: 100, sort: { updated: -1 } });
});
