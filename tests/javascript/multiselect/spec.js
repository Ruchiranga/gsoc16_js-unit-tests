/**
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @package     Joomla
 * @subpackage  JavaScript Tests
 * @since       3.6
 * @version     1.0.0
 */

define(['jquery', 'testsRoot/multiselect/spec-setup', 'jasmineJquery'], function ($) {
    describe('Multiselect', function () {
        beforeAll(function () {
            $("#ms-cb1").trigger('click');
            var shiftClick = $.Event("click");
            shiftClick.shiftKey = true; 
            console.log(shiftClick);
            $("#ms-cb3").trigger(shiftClick);
        });
        it('should make the ms-cb1 checkbox checked', function () {
            expect($("#ms-cb1")).toBeChecked();
        });
        it('should make the ms-cb2 checkbox checked', function () {
            expect($("#ms-cb2")).toBeChecked();
        });
        it('should make the ms-cb3 checkbox checked', function () {
            expect($("#ms-cb3")).toBeChecked();
        });
        it('should not make the ms-cb4 checkbox checked', function () {
            expect($("#ms-cb4")).not.toBeChecked();
        });
    });
});
