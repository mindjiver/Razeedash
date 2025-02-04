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

import './component.html';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

Template.commitLink.helpers({
    gitData() {
        const resourceData = this.resource.searchableData;
        if(resourceData) {
            let gitRepo;
            let otherRepo;
            let commitSHA;
            for (const key in resourceData) {
                if(key === 'annotations_razee_io_commit_sha') {
                    commitSHA = resourceData[key];
                }
                if(key === 'annotations_razee_io_git_repo') {
                    gitRepo = resourceData[key];
                }
                if(key === 'annotations_razee_io_source_url') {
                    otherRepo = resourceData[key];
                }
            }
            // razee.io/git-repo
            if(gitRepo && commitSHA) {
                return {
                    'link': gitRepo.split('.git')[0] + '/commit/' + commitSHA,
                    'text': Blaze._globalHelpers.trimCommit(commitSHA)
                };
            } 
            // razee.io/source-url
            if(otherRepo) {
                return {
                    'link': otherRepo,
                    'text': 'source'
                };
            }
        } 
    }, 
});
