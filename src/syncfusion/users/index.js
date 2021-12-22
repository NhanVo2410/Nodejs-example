import { Ajax } from '@syncfusion/ej2-base';
import { Grid, Page, CommandColumn } from '@syncfusion/ej2-grids';
import { DialogUtility } from '@syncfusion/ej2-popups';

let userId = 0;

function okClick() {
  const deleteForm = document.forms['delete-user-form'];
  deleteForm.action = `/api/user/${userId}?_method=DELETE`;
  deleteForm.submit();
}

const commandClick = (args) => {
  userId = args.rowData._id;
  DialogUtility.confirm(
    {
      title: 'Delete User ?',
      content: `Do you want to delete ${args.rowData.info.FullName}!`,
      okButton: { text: 'OK', click: okClick },
      cancelButton: { text: 'Cancel' },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: 'Zoom' },
    },
  );
};

// Grid
Grid.Inject(Page);
Grid.Inject(CommandColumn);

const grid = new Grid({
  allowPaging: true,
  commandClick,
  columns: [
    {
      field: '_id', headerText: 'User ID', textAlign: 'Left', width: 120,
    },
    {
      field: 'info.FullName', headerText: 'Name', textAlign: 'Left', width: 120,
    },
    {
      field: 'local.UserName', headerText: 'User Name', textAlign: 'Left', width: 120,
    },
    {
      field: 'local.email', headerText: 'Email', textAlign: 'Left', width: 120,
    },
    {
      field: 'info.Age', headerText: 'Age', textAlign: 'Left', width: 120,
    },
    {
      headerText: 'Commands',
      width: 120,
      commands: [{ buttonOption: { content: 'Delete', cssClass: 'e-flat' } }],
    },
  ],
});
grid.appendTo('#Grid');

function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const getUserList = () => {
  console.log(getCookie('Authorization'));
  const ajax = new Ajax('/api/user/getAllUserApi', 'GET');
  ajax.beforeSend = () => {
    ajax.httpRequest.setRequestHeader('Authorization', `Bearer ${getCookie('Authorization')}`);
  };
  ajax.send();
  ajax.onSuccess = (data) => {
    const user = JSON.parse(data);
    console.log(user.data);
    grid.dataSource = user.data;
  };
};

getUserList();

document.getElementById('Grid').addEventListener('click', (args) => {
  if (args.target.classList.contains('e-rowcell')) {
    const rowInfo = grid.getRowInfo(args.target);
    window.location = `/api/user/edit/${rowInfo.rowData._id}`;
  }
});
