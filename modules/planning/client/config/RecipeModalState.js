'use strict';

var publicStates = ['home', 'authentication.signup', 'authentication.signin', 'password.forgot', 'password.reset', 'password.reset.invalid', 'password.reset.success', 'password.reset.form'];

angular.module('planning').run(['$rootScope', '$state', '$modal', 'Authentication',
    function($rootScope, $state, $modal, Authentication) { //http://plnkr.co/edit/Qi1UDcFgTEeJmKa4liK2?p=preview
        var stateBehindModal = {},
            modalInstance = null;

        $rootScope.$on('$stateChangeStart', function(evt, toState, toStateParams, fromState, fromStateParams) {
            // console.log('$stateChangeStart', Authentication.user, toState, JSON.stringify(toStateParams));

            //for all non-public states
            //if not authenticated, redirect to homepage, leaving breadcrumbs in url (redirect parameter)
            if (!Authentication.user && !_.contains(publicStates, toState.name)) {
                console.log('not authorized');
                var params = {
                    redirect: {
                        state: toState.name,
                        params: JSON.stringify(toStateParams)
                    }
                };
                console.log('params', params);
                evt.preventDefault();
                $state.go('authentication.signin');
                return;
            }


            //
            // Implementing 'proxy': redirect to the state according to where it's from.
            //
            if (toState.proxy) {
                evt.preventDefault();

                if (fromState.name === '' || fromState.name === toState.proxy.external) {
                    // Visiting directly via URL or from the external state,
                    // redirect to external (full) state.
                    // $state.go(toState.proxy.external, toStateParams); // PINTEREST behaviour
                    $state.go(toState.proxy.internal, toStateParams);
                } else {
                    // Visiting from another state, redirect to internal (modal) state
                    $state.go(toState.proxy.internal, toStateParams);
                }

                return;
            }

            // Implementing 'isModal':
            // perform the required action to transitions between 'modal states' and 'non-modal states'.
            //

            if (!fromState.isModal && toState.isModal) {
                //
                // Non-modal state ---> modal state
                //

                stateBehindModal = {
                    state: fromState,
                    params: fromStateParams
                };

                // Open up modal
                // modalInstance = $modal.open({
                //     template: '<div ui-view='modal'></div>'
                // });

                modalInstance = $modal.open({
                    // templateUrl: 'modal1.html',
                    template: '<div ui-view="modal"></div>',
                    // backdrop: 'static',
                    controller: function($modalInstance, $scope) {
                        $scope.close = function() {
                            $modalInstance.dismiss('close');
                        };
                    }
                });

                modalInstance.result.finally(function() {
                    // Reset instance to mark that the modal has been dismissed.
                    modalInstance = null;

                    // Go to previous state
                    $state.go(stateBehindModal.state, stateBehindModal.params);
                });

            } else if (fromState.isModal && !toState.isModal) {
                //
                // Modal state ---> non-modal state
                //

                // Directly return if the instance is already dismissed.
                if (!modalInstance) {
                    return;
                }

                // Dismiss the modal, triggering the reset of modalInstance
                modalInstance.dismiss();
            }
        });
    }
]);
