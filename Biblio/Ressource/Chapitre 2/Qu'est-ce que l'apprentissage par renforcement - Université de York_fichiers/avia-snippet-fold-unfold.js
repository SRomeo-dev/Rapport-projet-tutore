"use strict";var avia_js_shortcodes=avia_js_shortcodes||{};var aviaJS=aviaJS||{};(function(){if(!avia_js_shortcodes.aviaFoldUnfoldSection){class avFoldUnfoldSection
{container=null;id='';settings={};button=[];foldContainer=[];folded=!1;preview=!1;innerDimension={};textblock=[];multiColumsTextblock=!1;gridRow=[];colorSection=[];column=[];constructor(container){this.container=container;this.container.avFoldUnfoldSection=this;this.id=container.getAttribute('id');this.init()}
init(){this.settings=JSON.parse(this.container.dataset.fold_unfold);this.preview=document.getElementById('av-admin-preview')!=null;this.moveIntoFoldContainer();if(!this.button.length||!this.foldContainer.length||this.checkMissingInnerContainers()){return}
if(this.isNested()){this.container.classList.remove('avia-fold-init');this.foldContainer[0].classList.remove('unfolded','folded');this.foldContainer[0].style['max-height']='unset';this.button[0].remove();return}
this.foldContainer[0].style['max-height']=this.settings.height+'px';this.foldContainer[0].classList.add('folded');this.foldContainer[0].classList.remove('unfolded');this.folded=!0;this.container.classList.add('avia-fold-init-done');this.getMaxHeight();this.foldChanged();this.bindEvents();this.container.classList.remove('avia-fold-init')}
moveIntoFoldContainer(){if(this.container.hasChildNodes()){let children=this.container.childNodes;for(const child of children){if(child.classList){if(child.classList.contains('av-fold-unfold-container')){this.foldContainer[0]=child}
if(child.classList.contains('av-fold-button-wrapper')){const btn=child.getElementsByClassName('av-fold-button-container');if(btn.length){this.button[0]=btn[0]}}}}}
let move=null;if(this.settings.context=='avia_sc_text'){let el=this.foldContainer[0].nextSibling;while(el){if(el.classList&&el.classList.contains('avia_textblock')){move=el;break}
el=el.nextSibling}}else if(this.settings.context=='avia_sc_columns'){let el=this.foldContainer[0].nextSibling;this.column=this.foldContainer[0].getElementsByClassName('av-fold-unfold-inner');if(this.column.length){while(el){if(el.classList&&el.classList.contains('av-fold-button-wrapper')){el=el.nextSibling}else{const next=el.nextSibling;this.column[0].append(el);el=next}}}}else{const el=this.container.nextSibling;if(el){move=el}}
if(move){this.foldContainer[0].append(move)}}
checkMissingInnerContainers(){let retVal=!1;switch(this.settings.context){case 'avia_sc_text':this.textblock=this.container.getElementsByClassName('avia_textblock');if(this.textblock.length==0){retVal=!0}else{this.multiColumsTextblock=this.textblock[0].classList.contains('av_multi_colums')}
break;case 'avia_sc_grid_row':this.gridRow=this.container.getElementsByClassName('av-layout-grid-container');if(this.gridRow.length==0){retVal=!0}
break;case 'avia_sc_section':this.colorSection=this.container.getElementsByClassName('avia-section');if(this.colorSection.length==0){retVal=!0}
break;case 'avia_sc_columns':if(!this.column[0].childNodes.length){retVal=!0}
break;default:retVal=!0}
return retVal}
isNested(){const parent=this.container.parentElement;if(null==parent){return!1}
let closest=parent.closest('.avia-fold-unfold-section');if(closest==parent){closest=null}
return closest!=null}
bindEvents(){this.container.addEventListener('transitionend',this.onTransitionEnd.bind(this));this.container.addEventListener('webkitTransitionEnd',this.onTransitionEnd.bind(this));this.button[0].addEventListener('click',this.onClickFoldUnfold.bind(this));window.addEventListener('avia_fold_unfold_changed',this.onFoldUnfoldChanged.bind(this));window.addEventListener('resize',aviaJS.aviaJSHelpers.debounce(this.onResize.bind(this),200))}
getMaxHeight(){switch(this.settings.context){case 'avia_sc_text':this.innerDimension=this.textblock[0].getBoundingClientRect();break;case 'avia_sc_grid_row':this.innerDimension=this.gridRow[0].getBoundingClientRect();break;case 'avia_sc_section':this.innerDimension=this.colorSection[0].getBoundingClientRect();break;case 'avia_sc_columns':this.innerDimension=this.column[0].getBoundingClientRect();break}}
foldChanged(){let btnText='',btnLink='';if(this.folded){this.foldContainer[0].style['max-height']=this.settings.height+'px';btnText=this.settings.more;btnLink='#'}else{this.getMaxHeight();this.foldContainer[0].style['max-height']=Math.ceil(this.innerDimension.height)+200+'px';btnText=this.settings.less;btnLink+='#'+this.id}
this.button[0].setAttribute('href',btnLink);this.button[0].textContent=btnText;this.triggerHeightChange()}
onClickFoldUnfold(event){event.preventDefault();event.stopPropagation();if(this.foldContainer[0].classList.contains('folded')){this.foldContainer[0].classList.remove('folded');this.foldContainer[0].classList.add('unfolded');this.folded=!1}else{this.foldContainer[0].classList.remove('unfolded');this.foldContainer[0].classList.add('folded');this.folded=!0}
this.foldChanged();let obj=this;setTimeout(function(){const opt={'bubbles':!0,'cancelable':!0,detail:{caller:obj}};const event=new CustomEvent('avia_fold_unfold_changed',opt);obj.container.dispatchEvent(event)},500)}
onTransitionEnd(event){this.container.classList.remove('avia-fold-init-done');this.triggerHeightChange()}
onResize(event){this.foldChanged()}
onFoldUnfoldChanged(event){this.foldChanged()}
triggerHeightChange(){const opt={'bubbles':!0,'cancelable':!0};const event=new CustomEvent('avia_height_change',opt);window.dispatchEvent(event)}}
avia_js_shortcodes.aviaFoldUnfoldSection=function(container){return new avFoldUnfoldSection(container)};aviaJS.aviaPlugins.register(avia_js_shortcodes.aviaFoldUnfoldSection,'.avia-fold-unfold-section')}})()