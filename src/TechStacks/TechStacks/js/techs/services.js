﻿(function () {
    "use strict";
    var app = angular.module('tech.services', []);

    app.service('techServices', ['$http', '$q', function ($http, $q) {
        return {
            getTech: function(id) {
                var deferred = $q.defer();
                $http.get('/techs/' + id).success(function (response) {
                    deferred.resolve(response.Tech);
                });
                return deferred.promise;
            },
            getTechBySlugTitle: function(title) {
                var deferred = $q.defer();
                $http.get('/techs/' + title)
                    .success(function (response) {
                        deferred.resolve(response.Tech);
                    });
                return deferred.promise;
            },
            searchTech: function (searchQuery) {
                var deferred = $q.defer();
                $http.get('/techs/search?NameContains=' + searchQuery + "&DescriptionContains=" + searchQuery)
                    .success(function (response) {
                        deferred.resolve(response.Results);
                    });
                return deferred.promise;
            },
            getAllTechs: function () {
                var deferred = $q.defer();
                $http.get('/techs').success(function (response) {
                    deferred.resolve(response.Techs);
                });
                return deferred.promise;
            },
            getRelatedStacks: function(techId) {
                var deferred = $q.defer();
                $http.get('/techs/' + techId + '/stacks').success(function (response) {
                    deferred.resolve(response.TechStacks);
                });
                return deferred.promise;

            },
            createTech: function (newTech) {
                var deferred = $q.defer();
                $http.post('/techs', newTech).success(function (response) {
                    deferred.resolve(response.Tech);
                });
                return deferred.promise;
            },
            updateTech: function (tech) {
                var deferred = $q.defer();
                $http.put('/techs/' + tech.Id, tech).success(function (response) {
                    deferred.resolve(response.Tech);
                });
                return deferred.promise;
            },
            updateTechnologyChoice: function (technologyChoice) {
                var deferred = $q.defer();
                $http.put('/techchoices/' + technologyChoice.Id, technologyChoice)
                    .success(function (response) {
                        deferred.resolve(response.TechnologyChoice);
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            deleteTech: function (tech) {
                return $http.delete('/techs/' + tech.Id);
            },
            updateLockStatus: function (techId, isLocked) {
                var deferred = $q.defer();
                $http.put('/admin/techs/' + techId + '/lock', { IsLocked: isLocked })
                    .success(function (response) {
                        deferred.resolve();
                    })
                    .error(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            removeTechChoice: function (techChoice) {
                var deferred = $q.defer();
                $http.delete('/techchoices/' + techChoice.Id)
                    .success(function (response) {
                        deferred.resolve(response.TechStack);
                    });
                return deferred.promise;
            },
            makeFavorite: function (tech) {
                var deferred = $q.defer();
                $http.put('/favorites/tech', { TechnologyId: tech.Id })
                    .success(function(response) {
                        deferred.resolve(response.Tech);
                    });
                return deferred.promise;
            },
            approveLogo: function(tech,status) {
                var deferred = $q.defer();
                $http.put('/admin/techs/' + tech.Id + '/logo', { Approved: status }).success(function (response) {
                    deferred.resolve(response.Tech);
                });
                return deferred.promise;
            },
            allTiers: [
                { name: 'ProgrammingLanguage', title: 'Programming Languages' },
                { name: 'Client', title: 'Client Libraries' },
                { name: 'Http', title: 'HTTP Server Technologies' },
                { name: 'Server', title: 'Server Libraries' },
                { name: 'Data', title: 'Databases and NoSQL Datastores' },
                { name: 'SoftwareInfrastructure', title: 'Server Software' },
                { name: 'OperatingSystem', title: 'Operating Systems' },
                { name: 'HardwareInfrastructure', title: 'Hardware Infastructure' },
            ]
        };
    }]);
})();

