/**
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @package     Joomla
 * @subpackage  JavaScript Tests
 * @since       3.6
 * @version     1.0.0
 */

define(['jquery', 'testsRoot/permissions/spec-setup', 'jasmineJquery'], function ($) {
	describe('sendPermissions', function () {
		beforeAll(function() {
			jasmine.Ajax.install();

			renderFn = Joomla.renderMessages;
			removeFn = Joomla.removeMessages;
			jtxtFn = Joomla.JText._;
			ajxerrFn = Joomla.ajaxErrorsMessages;
			scrollFn = window.scrollTo;

			Joomla.JText._ = jasmine.createSpy('_');
			Joomla.renderMessages = jasmine.createSpy('renderMessages');
			Joomla.removeMessages = jasmine.createSpy('removeMessages');
			Joomla.ajaxErrorsMessages = jasmine.createSpy('ajaxErrorsMessages');
			window.scrollTo = jasmine.createSpy('scrollTo');

			sendPermissions(event);
		});

		afterAll(function () {
			jasmine.Ajax.uninstall();
			
			Joomla.renderMessages = renderFn;
			Joomla.removeMessages = removeFn;
			Joomla.ajaxErrorsMessages = ajxerrFn;
			window.scrollTo = scrollFn;
			Joomla.JText._ = jtxtFn;
		});

		var $spanContainer = $('#ajax-test');

		it("should remove attribute class from icon", function() {
			expect($('#icon_0')).not.toHaveAttr('class');
		});

		it("should set style attribute to display the spinner in icon", function() {
			expect($('#icon_0')).toHaveAttr('style', 'background: url(../media/system/images/modal/spinner.gif); display: inline-block; width: 16px; height: 16px');
		});

		it("should call Joomla.removeMessages()", function() {
			expect(Joomla.removeMessages).toHaveBeenCalled();
		});

		describe("option == com_config && component == false && extension == false with Ajax failure", function() {
			beforeAll(function() {
				spyOn(window, "getUrlParam").and.callFake(function(variable) {
			    	switch (variable) {
			    		case 'option': return 'com_config';
			    		default: return false;
			    	}
			    });

				sendPermissions(event);
				request = jasmine.Ajax.requests.mostRecent();
				request.respondWith(responses.fail);
			});

			afterAll(function () {
				$spanContainer.find('span').removeClass().empty();
			});

			it("should have 'root.1' set to comp attribute in request data", function() {
				expect(request.data().comp[0]).toEqual('root.1');
			});

			it("should call Joomla.ajaxErrorsMessages(jqXHR, 'error', 'HTTP/1.1 404 Not Found')", function() {
				expect(Joomla.ajaxErrorsMessages).toHaveBeenCalledWith(jasmine.any(Object), 'error', 'HTTP/1.1 404 Not Found');
			});
			
			it("should call Joomla.renderMessages(undefined)", function() {
				expect(Joomla.renderMessages).toHaveBeenCalledWith(undefined);
			});

			it("should call window.scrollTo(0, 0)", function() {
				expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
			});
        
			it("should remove attribute style from icon", function() {
				expect($('#icon_0')).not.toHaveAttr('style');
			});
        
			it("should set attribute class in icon to icon-cancel", function() {
				expect($('#icon_0')).toHaveAttr('class', 'icon-cancel');
			});
		});

		describe("extension == false && view == component with Ajax failure", function() {
			beforeAll(function() {
				spyOn(window, "getUrlParam").and.callFake(function(variable) {
			    	switch (variable) {
			    		case 'view': return 'component';
			    		case 'component': return 'comp';
			    		default: return false;
			    	}
			    });

				sendPermissions(event);
				request = jasmine.Ajax.requests.mostRecent();
				request.respondWith(responses.fail);
			});

			afterAll(function () {
				$spanContainer.find('span').removeClass().empty();
			});

			it("should have 'comp' set to comp attribute in request data", function() {
				expect(request.data().comp[0]).toEqual('comp');
			});

			it("should call Joomla.ajaxErrorsMessages(jqXHR, 'error', 'HTTP/1.1 404 Not Found')", function() {
				expect(Joomla.ajaxErrorsMessages).toHaveBeenCalledWith(jasmine.any(Object), 'error', 'HTTP/1.1 404 Not Found');
			});
			
			it("should call Joomla.renderMessages(undefined)", function() {
				expect(Joomla.renderMessages).toHaveBeenCalledWith(undefined);
			});

			it("should call window.scrollTo(0, 0)", function() {
				expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
			});
        
			it("should remove attribute style from icon", function() {
				expect($('#icon_0')).not.toHaveAttr('style');
			});
        
			it("should set attribute class in icon to icon-cancel", function() {
				expect($('#icon_0')).toHaveAttr('class', 'icon-cancel');
			});
		});

		describe("extension != false && view != false with Ajax failure", function() {
			beforeAll(function() {
				spyOn(window, "getUrlParam").and.callFake(function(variable) {
			    	switch (variable) {
			    		case 'view': return 'view';
			    		case 'extension': return 'ext';
			    		case 'id': return 'id';
			    		default: return false;
			    	}
			    });

				sendPermissions(event);
				request = jasmine.Ajax.requests.mostRecent();
				request.respondWith(responses.fail);
			});

			afterAll(function () {
				$spanContainer.find('span').removeClass().empty();
			});

			it("should have 'comp' set to 'ext.view.id' in request data", function() {
				expect(request.data().comp[0]).toEqual('ext.view.id');
			});

			it("should have 'title' set to 'val' in request data", function() {
				expect(request.data().title[0]).toEqual('val');
			});

			it("should call Joomla.ajaxErrorsMessages(jqXHR, 'error', 'HTTP/1.1 404 Not Found')", function() {
				expect(Joomla.ajaxErrorsMessages).toHaveBeenCalledWith(jasmine.any(Object), 'error', 'HTTP/1.1 404 Not Found');
			});
			
			it("should call Joomla.renderMessages(undefined)", function() {
				expect(Joomla.renderMessages).toHaveBeenCalledWith(undefined);
			});

			it("should call window.scrollTo(0, 0)", function() {
				expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
			});
        
			it("should remove attribute style from icon", function() {
				expect($('#icon_0')).not.toHaveAttr('style');
			});
        
			it("should set attribute class in icon to icon-cancel", function() {
				expect($('#icon_0')).toHaveAttr('class', 'icon-cancel');
			});
		});

		describe("extension == false && view != false with Ajax failure", function() {
			beforeAll(function() {
				spyOn(window, "getUrlParam").and.callFake(function(variable) {
			    	switch (variable) {
			    		case 'view': return 'view';
			    		case 'option': return 'opt';
			    		case 'id': return 'id';
			    		default: return false;
			    	}
			    });

				sendPermissions(event);
				request = jasmine.Ajax.requests.mostRecent();
				request.respondWith(responses.fail);
			});

			afterAll(function () {
				$spanContainer.find('span').removeClass().empty();
			});

			it("should have 'comp' set to 'ext.view.id' in request data", function() {
				expect(request.data().comp[0]).toEqual('opt.view.id');
			});

			it("should have 'title' set to 'val' in request data", function() {
				expect(request.data().title[0]).toEqual('val');
			});

			it("should call Joomla.ajaxErrorsMessages(jqXHR, 'error', 'HTTP/1.1 404 Not Found')", function() {
				expect(Joomla.ajaxErrorsMessages).toHaveBeenCalledWith(jasmine.any(Object), 'error', 'HTTP/1.1 404 Not Found');
			});
			
			it("should call Joomla.renderMessages(undefined)", function() {
				expect(Joomla.renderMessages).toHaveBeenCalledWith(undefined);
			});

			it("should call window.scrollTo(0, 0)", function() {
				expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
			});
        
			it("should remove attribute style from icon", function() {
				expect($('#icon_0')).not.toHaveAttr('style');
			});
        
			it("should set attribute class in icon to icon-cancel", function() {
				expect($('#icon_0')).toHaveAttr('class', 'icon-cancel');
			});
		});

		describe("Skipping IF ladder and on success with resp.data.result == 'true' & resp.messages an object", function() {
			beforeAll(function() {
				spyOn(window, "getUrlParam").and.callFake(function(variable) {
			    	switch (variable) {
			    		case 'component': return 'title';
			    		default: return false;
			    	}
			    });

				sendPermissions(event);
				request = jasmine.Ajax.requests.mostRecent();
				request.respondWith(responses.success);
			});

			afterAll(function () {
				$spanContainer.find('span').removeClass().empty();
			});
        
			it("should make a AJAX request of type POST", function() {
				expect(request.method).toBe('POST');
			});

			it("should have request data with information 'not' '' '0' '1' 'title'", function() {
				expect(request.data()).toEqual({comp: ['not'], action: [''], rule: ['0'], value: ['1'], title: ['title']});
			});
        
			it("should set attribute class in icon to icon-save", function() {
				expect($('#icon_0')).toHaveAttr('class', 'icon-save');
			});

			it("should add class in icon to icon-save", function() {
				expect($spanContainer.find('span')).toHaveClass('test-class');
			});

			it("should class in icon to icon-save", function() {
				expect($spanContainer.find('span')).toContainText('Sample text');
			});
        
			it("should call Joomla.renderMessages({})", function() {
				expect(Joomla.renderMessages).toHaveBeenCalledWith({});
			});

			it("should call window.scrollTo(0, 0)", function() {
				expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
			});
		});

		describe("Skipping if ladder and on success with resp.data.result !== 'true' & resp.messages an object", function() {
			beforeAll(function() {
				spyOn(window, "getUrlParam").and.callFake(function(variable) {
			    	switch (variable) {
			    		case 'component': return 'title';
			    		default: return false;
			    	}
			    });

				sendPermissions(event);
				request = jasmine.Ajax.requests.mostRecent();
				responses.success.responseText = '{"data": {"result": false}, "messages": {}}';
				request.respondWith(responses.success);
			});

			afterAll(function () {
				$spanContainer.find('span').removeClass().empty();
			});

			it("should make a AJAX request of type POST", function() {
				expect(request.method).toBe('POST');
			});

			it("should have request data with information 'not' '' '0' '1' 'title'", function() {
				expect(request.data()).toEqual({comp: ['not'], action: [''], rule: ['0'], value: ['1'], title: ['title']});
			});
        
			it("should not set attribute class in icon to icon-save", function() {
				expect($('#icon_0')).not.toHaveAttr('class', 'icon-save');
			});

			it("should not add class in icon to icon-save", function() {
				expect($spanContainer.find('span')).not.toHaveClass('test-class');
			});

			it("should class in icon to icon-save", function() {
				expect($spanContainer.find('span')).not.toContainText('Sample text');
			});

			it("should set attribute class in icon to icon-cancel", function() {
				expect($('#icon_0')).toHaveAttr('class', 'icon-cancel');
			});

			it("should call Joomla.renderMessages({})", function() {
				expect(Joomla.renderMessages).toHaveBeenCalledWith({});
			});

			it("should call window.scrollTo(0, 0)", function() {
				expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
			});
		});

		describe("Skipping if ladder and on success with resp.data.result !== 'true' & resp.messages not an object", function() {
			beforeAll(function() {
				spyOn(window, "getUrlParam").and.callFake(function(variable) {
			    	switch (variable) {
			    		case 'component': return 'title';
			    		default: return false;
			    	}
			    });

				sendPermissions(event);
				request = jasmine.Ajax.requests.mostRecent();
				responses.success.responseText = '{"data": {"result": false}, "messages": ""}';
				request.respondWith(responses.success);
			});

			afterAll(function () {
				$spanContainer.find('span').removeClass().empty();
			});

			it("should make a AJAX request of type POST", function() {
				expect(request.method).toBe('POST');
			});
        
			it("should have request data with information 'not' '' '0' '1' 'title'", function() {
				expect(request.data()).toEqual({comp: ['not'], action: [''], rule: ['0'], value: ['1'], title: ['title']});
			});

			it("should not set attribute class in icon to icon-save", function() {
				expect($('#icon_0')).not.toHaveAttr('class', 'icon-save');
			});

			it("should not add class in icon to icon-save", function() {
				expect($spanContainer.find('span')).not.toHaveClass('test-class');
			});

			it("should class in icon to icon-save", function() {
				expect($spanContainer.find('span')).not.toContainText('Sample text');
			});

			it("should not set attribute class in icon to icon-save or icon-cancel", function() {
				expect($('#icon_0')).not.toHaveAttr('class', 'icon-cancel');
				expect($('#icon_0')).not.toHaveAttr('class', 'icon-save');
			});

			it("should not call Joomla.renderMessages({})", function() {
				expect(Joomla.renderMessages.calls.count()).toEqual(6);
			});

			it("should call window.scrollTo(0, 0)", function() {
				expect(window.scrollTo.calls.count()).toEqual(6);
			});
		});
	});
});
