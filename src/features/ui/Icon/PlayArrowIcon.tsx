type Props = {
  size?: number;
  width?: number;
  height?: number;
};
export function PlayArrowIcon({ size, width, height }: Props) {
  return (
    <svg
      width={size || width || 40}
      height={size || height || 40}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 17.175V6.82502C8 6.54168 8.1 6.30402 8.3 6.11202C8.5 5.92002 8.73333 5.82435 9 5.82502C9.08333 5.82502 9.171 5.83735 9.263 5.86202C9.355 5.88668 9.44233 5.92435 9.525 5.97502L17.675 11.15C17.825 11.25 17.9377 11.375 18.013 11.525C18.0883 11.675 18.1257 11.8333 18.125 12C18.125 12.1667 18.0877 12.325 18.013 12.475C17.9383 12.625 17.8257 12.75 17.675 12.85L9.525 18.025C9.44167 18.075 9.35433 18.1127 9.263 18.138C9.17167 18.1634 9.084 18.1757 9 18.175C8.73333 18.175 8.5 18.079 8.3 17.887C8.1 17.695 8 17.4577 8 17.175ZM10 15.35L15.25 12L10 8.65002V15.35Z"
        fill="white"
      />
    </svg>
  );
}