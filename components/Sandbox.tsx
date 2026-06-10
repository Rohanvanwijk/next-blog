import { uniqueArray } from "../utils/string";

export default function Sandbox() {
  const unique = uniqueArray([1, 2, 3, 4, 4, 3, 5]);
  return (
    <div className="w-full bg-blue-50 p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Sandbox</h2>
      <div className="bg-blue-50">
        <ul>
          {unique.map((item, index) => (
            <li key={index}>
              Unique Item: <span className="font-semibold">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
