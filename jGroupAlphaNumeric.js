if( typeof Object.create !== 'function') {
    Object.create = function(obj){
        function F(){}
        F.prototype = obj;
        return new F(); 
    };
}
(function ( $, window, document, undefined ) {
    var groupAlphaNumeric = {
        init: function(options){
            var self = this;
            self.elements = null;
            self.groups = [];
            self.finalGroups = [];
            self.options = $.extend({}, $.groupAlphaNumeric.options, options);
            self.group();
        },
        getElementList: function(){
            
            this.elements = $("[data-" + this.options.dataSelector + "]");
            this.getGroups();
            
        },
        getGroups: function(){
            
            if( this.elements.length > 0 ){
                var self = this;
                this.elements.map(function(){
                     if($.inArray( $(this).data(self.options.dataSelector) , self.groups) === -1){
                         self.groups.push( $(this).data(self.options.dataSelector) );
                     }
                 });
                 this.getSorted();
                
            } else {
                
                return null;
                
            } 
        },
        getSorted: function(){
            
            if( this.elements.length > 0 ){
                this.finalGroups = this.groups.sort();
                this.wrapGroups();
            } else {
                
                return null;
                
            } 
        },
        wrapGroups: function(){
            
             if( this.finalGroups.length > 0 ){
                var self = this;
                this.finalGroups.forEach(function(elem){
                     var wrapElement = document.createElement( self.options.wrapperTag );
                     wrapElement.setAttribute('class', 'group-alphanumeric group-' + elem);
                     wrapElement.setAttribute('data-group-header', elem);
                     var selectedGroup = $("[data-" + self.options.dataSelector + "='" + elem + "']");
                     selectedGroup.wrapAll( wrapElement );
                });
                 
                  this.addHeader();
                 
                 
             } else {
                 return null;
             }         
            
        },
        addHeader: function(){
            if(this.options.addHeader === true){
                var self = this;
                $("[data-group-header]").each(function(index, elem){
                    var $self = $(elem);
                    var headerElement = document.createElement( self.options.headerTag );
                    headerElement.innerText = $self.data('group-header');
                    $self.prepend( headerElement );
                    
                });
            }
        },
        group: function(){
        
            this.getElementList();
            
        }
    };
    
    $.groupAlphaNumeric = function(options){    
        if(this !== undefined){
            var objMain = Object.create( groupAlphaNumeric );   
            objMain.init(options);
        } else {
            return null;
        }
    }; 
    
    $.groupAlphaNumeric.options = {
        dataSelector: "group-character",
        wrapperTag: "div",
        addHeader: true,
        headerTag: "h1"
    };
 
}
( jQuery, window, document ));