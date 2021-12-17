'use strict';
app.factory('EmailMessageAnalysisService', function($http) {
    return {

        getAnalysisResult: function(query, headers, callback) {
            $http.get(getAPI()+"emailmessages?" + 'startdatetime=' + query.startdatetime + '&enddatetime=' + query.enddatetime, {headers})
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        },

        deleteEmailMessage: function(emailmessage, headers, callback) {
            $http.delete(getAPI()+'emailmessages/'+emailmessage.id, {headers})
            .then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            });
        }

    };
});
