import {ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AllKeyBindingsComponent } from './all-key-bindings.components';

describe('AllKeyBindingComponent', () => {
    let component: AllKeyBindingsComponent;
    let fixture: ComponentFixture<AllKeyBindingsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({imports: [AllKeyBindingsComponent]}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AllKeyBindingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges;
    });

    it('should ', () => {
        expect(component)
    });
});