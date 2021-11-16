import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomDialogModal extends LightningElement {
    @api visible = false;
    @api title = '';
    @api name;          //reference name of the component
    @api message = '';
    @api confirmLabel = 'Yes';
    @api cancelLabel = 'No';
    @api originalMessage;   //any event/message/detail to be published back to the parent component
    @api inputList = [];

    userInput = {};

    //handle button clicks
    handleClick(event){
        if(event.target.name == 'confirm'){
            const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
                .reduce((validSoFar, inputField) => {
                    inputField.reportValidity();
                    return validSoFar && inputField.checkValidity();
                }, true);

            if(! isInputsCorrect){
                return;
            }
        }

        let finalEvent = {
            originalMessage : this.originalMessage,
            status : event.target.name
        };

        for(let inpItem in this.inputList){
            //If user added input get it, otherwise taking the original value that was sent
            finalEvent[this.inputList[inpItem].name] = this.inputList[inpItem].name in this.userInput ? 
                                                        this.userInput[this.inputList[inpItem].name] : 
                                                        this.inputList[inpItem].value;
        }

        this.dispatchEvent(new CustomEvent('modalaction', {detail : finalEvent}));
    }

    handleInputAdded(event){
        for(let inpItem in this.inputList){
            if(this.inputList[inpItem].name == event.target.dataset.keyid){
                if(this.inputList[inpItem].isCheckbox == true){
                    this.userInput[this.inputList[inpItem].name] = event.detail.checked;
                }
                else{
                    this.userInput[this.inputList[inpItem].name] = event.detail.value;
                }
            }
        }
    }
}