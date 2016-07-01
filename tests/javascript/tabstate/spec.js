/**
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @package     Joomla
 * @subpackage  JavaScript Tests
 * @since       3.6
 * @version     1.0.0
 */

define(['jquery', 'testsRoot/tabstate/spec-setup', 'jasmineJquery'], function ($) {

    describe('Tabs-state initialized', function () {
        beforeEach(function () {
            $('#link1').click();
        });

        it('Should set \'tab-href\' to #menu1 in local storage on Menu1 link click', function () {
            expect(window.localStorage.getItem('tab-href')).toEqual('#menu1');
        });
    });
    describe('Tabs-state initialized', function () {
        beforeEach(function () {
            $('#link1').click();
        });
        
        it('Should set \'tab-href\' to #menu1 in local storage on Menu1 link click', function () {
            expect(window.localStorage.getItem('tab-href')).toEqual('#menu1');
        });
    });

});
