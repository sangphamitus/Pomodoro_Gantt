import { AppStatus } from '../common/enum'
import { useAppSelector } from '../configs/hooks'
import ErrorPage from './ErrorPage'

function Views() {
  const { status } = useAppSelector((state) => state.general)

  switch (status) {
    case AppStatus.error:
      return <ErrorPage />
    case AppStatus.loading:
      return <div> Loading</div>
    case AppStatus.idle:
      return <div>Idle</div>
    default:
      return <div>Success</div>
  }
}
export default Views
