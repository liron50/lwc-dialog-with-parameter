import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DemoDialogWithInput extends LightningElement {
    @track modalTitle = 'Modal title';
    @track modalMessage = 'Are you sure?';
    @track modalConfirmLabel = 'Yes';
    @track modalCancelLabel = 'Cancel';
    @track modalOriginalMessage;
    @track modalInputList = [];
    @track showModal = false;

    openModalDialog(){
        this.modalConfirmLabel = 'Save';
        this.modalCancelLabel = 'Cancel';
        this.modalTitle = 'Registration Page';
        this.modalMessage = 'Please fill the following information';
        this.modalOriginalMessage = 'registrationProcess';
        var opt = [
            { label: 'Business Analyst', value: 'Business Analyst' },
            { label: 'Developer', value: 'Developer' },
            { label: 'Administrator', value: 'Administrator' },
        ];
        this.modalInputList = [
                {name: 'firstName', isInput: true, label : 'First Name', required: true},
                {name: 'lastName', isInput: true, label : 'Last Name', required: true},
                {name: 'email', isInput: true, type: 'email', label : 'Email', required: true},
                {name: 'role', isCombo: true, label : 'Role', required: true, options : opt},
                {name: 'salesforceUser', isCheckbox: true, label : 'Are you using Salesforce', required: false}
        ];
        this.showModal = true;
    }

    modalHandleClick(event){
        console.log('event:: ' + JSON.stringify(event));

        if(event.detail.status == 'confirm' && event.detail.originalMessage == 'registrationProcess'){
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Thanks you for registration!',
                    variant: "success"
                })
            );
        }
        
        this.showModal = false;
    }
}