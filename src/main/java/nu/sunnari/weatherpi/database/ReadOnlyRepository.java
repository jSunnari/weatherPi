package nu.sunnari.weatherpi.database;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import java.io.Serializable;

/**
 * Created by Jonas on 2017-05-30.
 */

@NoRepositoryBean
public interface ReadOnlyRepository<T, ID extends Serializable> extends Repository<T, ID> {

    T findOne(ID id);

    Iterable<T> findAll();
}
