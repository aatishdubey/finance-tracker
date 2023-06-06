import React, { Fragment } from 'react';

type PropsT = {
  title?: string;
  icon?: string;
  keepDefaultDescription?: boolean;
  description?: React.ReactNode | React.ReactNode[];
  retryRequestLabel?: string;
  onRetryRequest?: () => void;
  actions?: React.ReactNode | React.ReactNode[];
};

const DEFAULT_DESCRIPTION = [
  'Well, this is embarrassing!',
  'Looks like we have a problem here. We are going to investigate and fix this. So, you should try again later.',
];

export function ErrorInformation({
  title = 'Oops!',
  icon = '🥺',
  keepDefaultDescription = true,
  description,
  retryRequestLabel = 'Retry Request',
  onRetryRequest,
  actions,
}: PropsT) {
  const descriptionsProp = description
    ? Array.isArray(description)
      ? description
      : [description]
    : [];
  const descriptions = keepDefaultDescription
    ? [...DEFAULT_DESCRIPTION, ...descriptionsProp]
    : descriptionsProp;
  const actionsArr = actions
    ? Array.isArray(actions)
      ? actions
      : [actions]
    : [];
  return (
    <div className="text-center">
      <div className="text-red-700">
        <h2> {title} </h2>
        <span className="text-8xl"> {icon} </span>
      </div>
      {descriptions.map((description, i) => {
        return typeof description === 'string' ? (
          <p className="my-3" key={`para-${i}`}>
            {' '}
            {description}{' '}
          </p>
        ) : (
          <Fragment key={`elem-${i}`}> {description} </Fragment>
        );
      })}
      <div className="mt-5">
        {!!onRetryRequest && (
          <button
            onClick={onRetryRequest}
            className="p-button-primary p-button-sm p-button-rounded"
          >
            {retryRequestLabel}
          </button>
        )}
        {!!onRetryRequest && actionsArr.length > 0 && (
          <div className="mt-2 text-purple-500"> OR </div>
        )}
        {actionsArr.map((action, i) => (
          <div className="my-1" key={`action-${i}`}>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}
