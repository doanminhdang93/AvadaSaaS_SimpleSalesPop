import Loadable from 'react-loadable';
import Loading from '../../components/Loading/Loading';

// eslint-disable-next-line new-cap
export default Loadable({
  loader: () => import('../../pages/Settings/Settings'),
  loading: Loading
});
