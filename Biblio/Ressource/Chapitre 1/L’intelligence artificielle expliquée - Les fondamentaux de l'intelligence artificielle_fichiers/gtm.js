var checkout = [];
var gtm = new function(){
	
	this.product = new function(){
		// click sur produit
		this.click = function(e,list_name){

			if (typeof gtm_isLoaded !== "undefined"){
				e.preventDefault();
				
				// recherche type de liste (horizontale/verticale) 
				let $Product = $(this),
					mr = setTimeout(function(){document.location = $Product.attr('href');}, 100);
					
				// appel GA4
				dataLayer.push({ecommerce: null});
				dataLayer.push({
					event: 'select_item', 
					ecommerce: {
						item_list_id: $Product.data('list'),
						item_list_name: list_name,
						items: [{
						  item_id: $Product.data('ref'),
						  item_name: $Product.data('title'),
						  index: parseInt($Product.data('pos')),
						  item_category: $Product.data('type'),
						  item_category2: $Product.data('family'),
						  price: parseFloat($Product.data('price'))
						}]
					},
					event_callback: function() {
						clearTimeout(mr);
						document.location = $Product.attr('href');
					}
				});
			}
		}  
		
		// impression de liste de produits
		this.impression = function(content){
			let $Container,
				$Products,
				$Product,
				items =[];
			
			dataLayer.push({ecommerce: null});	
			if(content){
				// gestion de l'impression avec pagination ajax 
				$Products =  $(content).find('li');
				$Products.each(function(i){
					$Product  = $(this);
					
					let P = {};
					P.item_name = $Product.data('title');
					P.item_id = $Product.data('ref');
					P.price = parseFloat($Product.data('price'));
					if ($Product.data('type')) {P.item_category = $Product.data('type')};
					if ($Product.data('family')) {P.item_category2 = $Product.data('family')};
					P.item_list_id = $Product.data('list');
					P.item_list_name = document.getElementById("pageTitle").innerText;
					P.index = parseInt($Product.data('pos'));
					items.push(P);
					
					$Product.click(function(){
						return gtm.product.click.call(this,e,P.item_list_name);
					});
				})
					
				// Appel GA4	
				if (items.length > 0){ 
					dataLayer.push({
						event: 'view_item_list', 
						ecommerce: {
							item_list_id: items[0].item_list_id,
							item_list_name: items[0].item_list_name,
							items: items
						}
					})
				}
				
			}else{
				// ajout du dataLayer impression pour les listes de produit
				$('.products').each(function(){
					$Container = $(this);

					// recherche type de liste (horizontale/verticale) 
					let type = ($Container.parents('.lstH ').length ? "H":"V"),
						list_name;
					if (type === "V"){
						list_name = document.getElementById("pageTitle").innerText;
						$Products = $Container.children();
					}else{
						list_name = $Container.parent().children('h2').text();
						$Products = $Container.children().children();
					}
					
					$Products.each(function(i){
						$Product = $(this);
						
						let P = {};
						P.item_name = $Product.data('title');
						P.item_id = $Product.data('ref');
						P.price = parseFloat($Product.data('price'));
						if ($Product.data('type')) {P.item_category = $Product.data('type')};
						if ($Product.data('family')) {P.item_category2 = $Product.data('family')};
						P.item_list_id = $Product.data('list');
						P.item_list_name = list_name;
						P.index = parseInt($Product.data('pos'));
						items.push(P);
						if (type === "V"){
							$Product.find('a.item').click(function(e){return gtm.product.click.call(this,e,list_name);})
						}else{
							$Product.click(function(e){return gtm.product.click.call(this,e,list_name);})
						}
						
					})
						
					// Appel GA4	
					if (items.length > 0){ 
						dataLayer.push({
							event: 'view_item_list', 
							ecommerce: {
								item_list_id: items[0].item_list_id,
								item_list_name: items[0].item_list_name,
								items: items
							}
						})
					}
				});
			}
		} 
	}
	
	this.basket = new function(){
		// ajout au panier
		this.upd = function(qty){
			let $Product = $(this),
				title = $Product.data('name'),
				item,
				price,
				event;

			try {
				if (!title) {title = (document.querySelector("#Title") || document.querySelector(".title")).innerText}
			} catch (error) {
			  console.error(error);
			}
			
			price = parseFloat($Product.data('price'));
							 
			if (qty > 0){
				event = 'add_to_cart';
			}else{
				qty = Math.abs(qty);
				event = 'remove_from_cart';
			}
			
			// Appel AG4
			dataLayer.push({ecommerce: null});
			dataLayer.push({
				event: event,
				ecommerce: {
					value: price * qty,
					currency: 'EUR',
					items: [{
						item_id: $Product.data('ref'),
						item_name: title,
						item_category: $Product.data('type'),
						item_category2: $Product.data('family'),
						price: price,
						quantity:qty,
						
					}]
				}
			});
		}
		
		// Validation du paiement
		this.checkout = function(){
			let	items=[];
			
			$('#Order').children().each(function(){
				let $Product = $(this);
				P = {};
				P.item_name = $Product.data('name');
				P.item_id = $Product.data('ref');
				P.price = parseFloat($Product.data('price'));
				P.item_category = $Product.data('type');
				P.item_category2 = $Product.data('family');
				P.quantity = parseInt($Product.data('quantity'));
				items.push(P);
			});			

			dataLayer.push({ecommerce: null});	
			dataLayer.push({
					event: 'begin_checkout',
					ecommerce: {
						value: parseFloat($('#NetPay > .Price').text().replace(',','.')),
						currency: 'EUR',
						items: items
					}
				});
		}   
	}
	
	this.account = new function(){
		// création
		this.create = function(){
			dataLayer.push({event: 'sign_up'});
		}
		// connexion
		this.login = function(){
			dataLayer.push({event: 'login'});
		}   
	}
	
	this.search = new function(){
		// utilisation du moteur de recherche interne
		this.trigger = function(exp){
			dataLayer.push({event: 'search', search_term: exp});
		}   
	}
	
	// initilisation des actions sur listes de produits
	this.init = function(){
		gtm.product.impression();
	}
}

// initialisation de la personnalisation JS des retours GTM
$(function() {gtm.init();});