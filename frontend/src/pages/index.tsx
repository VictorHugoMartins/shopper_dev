import { useState } from "react";

import { API } from "~/config/apiRoutes";

import PageStructure from "~/components/PageStructure";
import Table from "~/components/Table";
import Button from "~/components/Button/Button";
import Flexbox from "~/components/Flexbox/Flexbox";

import { DataTableRenderType } from "~/types/DataTableRenderType";

import Toast from "~/utils/Toast/Toast";
import AllFileInput from "~/components/AllFileInput";

import styles from './index.module.scss';

function HomePage() {
  const [_tableData, setTableData] = useState<DataTableRenderType>();
  const [_isValid, setIsValid] = useState<boolean>(false);

  const validateFile = (data: string) => {
    setIsValid(false);
    const apiUrl = API.VALIDATE();
    const requestData = { data };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    };

    const resp = fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTableData(data.object.list);
          setIsValid(data.object.isValid);
        } else {
          Toast.error(data.message)
        }
      })
      .catch(error => { Toast.error(error) });

    return resp;
  };

  const updateFile = (data: {}) => {
    const apiUrl = API.UPDATE();
    const requestData = { data };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(requestData)
    };

    const resp = fetch(apiUrl, requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Toast.success(data.message);
          setIsValid(false);
          setTableData(null);
        } else {
          Toast.error(data.message)
        }
      })
      .catch(error => { Toast.error(error) });

    return resp;
  };

  return (
    <PageStructure title={"Página Inicial"}>
      <Flexbox justify="flex-end" width={"100%"} >
        <AllFileInput
          onChange={(f) => { validateFile(f.file) }}
          remove={_tableData === null}
        />
        <Button
          color="primary"
          text={"Atualizar"}
          disabled={!_isValid}
          onClick={() => updateFile(_tableData.rows)}
          className={styles.updateButton}
        />
      </Flexbox>
      {_tableData && <Table
        columns={_tableData.columns}
        rows={_tableData.rows}
      />}
    </PageStructure>
  )
}

export default HomePage;