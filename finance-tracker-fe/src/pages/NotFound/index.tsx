import { Link } from 'react-router-dom';
import { ErrorInformation } from '../../components/ErrorInfo';

export function NotFoundPage() {
  return (
    <div className="pt-8">
      <ErrorInformation
        title="Looks like you are lost"
        icon="😱"
        keepDefaultDescription={false}
        description={[
          'This page does not exist',
          <div className="text-xl">
            <strong>
              <div>
                <span className="text-red-500">Return to home page.</span>
              </div>
            </strong>
          </div>,
        ]}
        actions={
          <Link className="no-underline" to="/" referrerPolicy="same-origin">
            <button className="p-button-text p-button-lg">Go Home</button>
          </Link>
        }
      />
    </div>
  );
}
