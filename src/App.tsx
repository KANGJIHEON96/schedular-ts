import React from 'react';
import './App.css';

import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda, EventSettingsModel, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { render } from '@testing-library/react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data';

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'en-US':{
    'schedule':{
      'saveButton': '일정 생성',
      'cancelButton': '닫기',
      'deleteButton': '지우기',
      'newEvent': '일정 추가',
      'editEvent': '수정하기',
      'addTitle': '일정 제목',
      'moreDetails': '세부일정추가',
      'save': '저장',
      'deleteEvent': '일정삭제',
      'delete': '삭제',
      'cancel': '닫기',
      'quickDialog': '정말 일정을 삭제하시겠어요?'
    }
  }
})

class App extends React.Component {
  private localData: EventSettingsModel = {
    dataSource: [{
      EndTime: new Date(2021, 4, 2, 6, 30),
      StartTime: new Date(2019, 4, 2, 4, 0),
      Subject: '테스트'}]
  };
  private remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });

  private editorWindowTemplate(props: any): JSX.Element {
    return (
    <table className="custom-event-editor" style={{ width: '100%'}}>
      <tbody>
        <tr>
          <td className="e-textlabel">제목</td>
          <td><input id="Summary" className="e-field e-input" name="Subject" type="text" style={{ width: '100%'}}/></td>
        </tr>
        <tr>
          <td className="e-textlabel">상태</td>
            <td>
            <DropDownListComponent id="EventType" dataSource={['새 일정', '요청됨', '확인됨']}
              placeholder='상태 입력' data-name="EventType" className="e-field" style={{ width: '100%'}} value={props.EventType || null}>
            </DropDownListComponent>
            </td>
        </tr>
        <tr>
          <td className="e-textlabel">From</td>
            <td>
            <DateTimePickerComponent id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} 
            format='dd/MM/yy hh:mm a' className="e-field">
            </DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td>
              <DateTimePickerComponent id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)}
              format='dd/MM/yy hh:mm a' className="e-field">
                </DateTimePickerComponent>
            </td>
          </tr>
        <tr>
          <td className="e-textlabel">내용</td>
          <td>
            <textarea id="Description" className="e-field e-input" name="Description"
            rows={3} cols={50}
            style={{ width: '100%', height: '60px ! important', resize: 'vertical'}} ></textarea>
          </td>
        </tr>
      </tbody>
    </table> );
  }

  public render() {
    return <ScheduleComponent height = '500' width = '1000' currentView='Day' selectedDate={new Date(2021, 4, 2)}
    eventSettings={this.localData}
    editorTemplate={this.editorWindowTemplate.bind(this)}>
      <ViewsDirective>
        <ViewDirective option='Day' displayName='1박2일' interval = {2} ></ViewDirective>
        <ViewDirective option='Day' displayName='2박3일' interval = {3} ></ViewDirective>
        <ViewDirective option='Day' displayName='3박4일' interval = {4} ></ViewDirective>
        <ViewDirective option='Day' displayName='4박5일' interval = {5} ></ViewDirective>
        <ViewDirective option='Day' displayName='5박6일' interval = {6} ></ViewDirective>
        <ViewDirective option='Day' displayName='6박7일' interval = {7} ></ViewDirective>
        <ViewDirective option='Month' displayName='달력 보기'></ViewDirective>
        
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      
    </ScheduleComponent>
  }
}

export default App;