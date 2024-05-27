import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupedVerticalChartComponent } from './grouped-vertical-chart.component';

describe('GroupedVerticalChartComponent', () => {
  let component: GroupedVerticalChartComponent;
  let fixture: ComponentFixture<GroupedVerticalChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedVerticalChartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupedVerticalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
