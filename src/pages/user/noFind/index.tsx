import { Image } from 'antd';
import accuPatient from '@/assets/images/user/noFindImg.png';
import style from './index.less';

function noFind() {
  return (
    <div className={style.box}>
      <div className={style.cont}>
        <Image className={style.imgs} width={200} preview={false} src={accuPatient} />
        <div>
          <div className={style.title}>404</div>
          <div className={style.con}>页面路径有误，或您无权限访问该页面。</div>
        </div>
      </div>
    </div>
  );
}

export default noFind;
