import React from "react";

interface Column<T> {
    header: string;
    render: (item: T) => React.ReactNode;
    className?: string;
}

interface Props<T> {
    title?: string;
    data: T[];
    column: Column<T>[];
    emptyMessage?: string;
}

function UserTable<T extends { _id?: string; id?: string }>({
    title,
    data,
    column,
    emptyMessage = "No User Found",
}: Props<T>) {


    return (
        <div className="w-full">
            {title && (
                <div className="mb-8">
                    <h2 className="text-4xl font-bold tracking-tight text-[var(--primary)]">
                        {title}
                    </h2>
                </div>
            )}

            <div className="glass-panel rounded-[2rem] overflow-hidden border border-[var(--outline-variant)]/10 shadow-2xl">

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">

                        <thead>
                            <tr className="bg-[var(--surface-container-highest)]/100">
                                {column.map((col) => (
                                    <th
                                        key={col.header}
                                        className="px-8 py-5 text-xs uppercase tracking-[0.2em] font-bold text-[var(--secondary)] whitespace-nowrap"
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[var(--outline-variant)]/10">
                            {data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={column.length}
                                        className="py-20 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-4">

                                            <div>
                                                <p className="text-[var(--text-secondary)]">
                                                    {emptyMessage}
                                                </p>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr
                                        key={item._id || item.id || index}
                                        className="hover:bg-[var(--surface-bright)]/20 transition-all duration-300"
                                    >
                                        {column.map((col) => (
                                            <td
                                                key={col.header}
                                                className={`px-8 py-6 text-[var(--text-primary)] ${col.className || ""}`}
                                            >
                                                {col.render(item)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserTable;