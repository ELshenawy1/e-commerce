﻿using Core.Entities;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        List<T> GetAll();
        T GetByID(int id);
        T GetEntityWithSpecification(ISpecification<T> spec);
        List<T> List(ISpecification<T> spec);
        int Count(ISpecification<T> spec);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
