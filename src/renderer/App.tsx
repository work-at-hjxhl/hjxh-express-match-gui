/* eslint-disable react-hooks/exhaustive-deps */
import { Tab, Tabs } from '@mui/material';
import $ from 'lodash';
import { useEffect } from 'react';
import useStateRef from 'react-usestateref';

import { Ping } from '../main/modules/heartBeats/const';

import { StepperIntro } from './components/StepperIntro';

import { MenuDB } from './MenuDB';
import { MenuUploadErp } from './MenuUploadErp';
import { IDataCenter, initDataCenter } from './data/center';
import { menuDbView, menuErpUpload, menuInstruction, menuTrdUpload } from './data/menu';
import { getSettings } from './utils';

import './styles/doc.scss';

export default function App() {
  const [data, setData, refData] = useStateRef<IDataCenter>(initDataCenter());

  const setKey = (key, val) => {
    setData($.merge({ ...refData.current }, { [key]: val }));
  };

  useEffect(() => {
    /**
     * heartbeat
     */
    window.electron.once(Ping, console.log);
    window.electron.heartBeats();

    /**
     * global settings
     */
    console.log({ globalSettings: getSettings() });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col" id="content">
      <Tabs
        value={data.menu.curMenu}
        onChange={(_, v) => {
          setData({ ...data, menu: { curMenu: v } });
        }}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="nav tabs example"
      >
        <Tab value={menuInstruction} label={'使用指引'} />
        <Tab value={menuErpUpload} label="ERP" />
        <Tab value={menuTrdUpload} label="TRD" />
        <Tab value={menuDbView} label={'数据库'} />
      </Tabs>

      <div
        className={
          'doc max-h-full max-w-full min-w-9/10 mx-auto px-10 overflow-auto flex-auto flex flex-wrap justify-center gap-10'
        }
      >
        {data.menu.curMenu === menuInstruction && <StepperIntro />}

        {data.menu.curMenu === menuErpUpload && (
          <MenuUploadErp
            isErp
            uploaded={data[menuErpUpload].uploaded}
            rowsPct={data[menuErpUpload].rowsPct}
            sizePct={data[menuErpUpload].sizePct}
            consoleItems={data[menuErpUpload].consoleItems}
            setRowsPct={(k, v) => setKey(k, { rowsPct: v })}
            setSizePct={(k, v) => setKey(k, { sizePct: v })}
            setConsoles={(k, v) =>
              setKey(k, {
                consoleItems: [...data[menuErpUpload].consoleItems, v].slice(-100),
              })
            }
            setUploaded={(k, v) =>
              setKey(k, { uploaded: [...data[menuErpUpload].uploaded, v].slice(-10) })
            }
          />
        )}

        {data.menu.curMenu === menuTrdUpload && (
          <MenuUploadErp
            isErp={false}
            uploaded={data[menuTrdUpload].uploaded}
            rowsPct={data[menuTrdUpload].rowsPct}
            sizePct={data[menuTrdUpload].sizePct}
            consoleItems={data[menuTrdUpload].consoleItems}
            setRowsPct={(k, v) => setKey(k, { rowsPct: v })}
            setSizePct={(k, v) => setKey(k, { sizePct: v })}
            setConsoles={(k, v) =>
              setKey(k, { consoleItems: [...data[menuTrdUpload].consoleItems, v].slice(-100) })
            }
            setUploaded={(k, v) =>
              setKey(k, { uploaded: [...data[menuTrdUpload].uploaded, v].slice(-10) })
            }
          />
        )}

        {data.menu.curMenu === menuDbView && <MenuDB />}
      </div>
    </div>
  );
}
